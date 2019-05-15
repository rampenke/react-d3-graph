/*global console*/
/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-console: 0*/
import React from "react";

import Form from "react-jsonschema-form";
import "./styles.css";

import defaultConfig from "../src/components/graph/graph.config";
import { Graph } from "../src";
import utils from "./utils";
import reactD3GraphUtils from "../src/utils";
import { JsonTree } from "react-editable-json-tree";

import "./component-panel.css";
const sandboxData = utils.loadDataset();
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

import * as schemas from "./schemas";
import CodeGen from "./codegen";

/**
 * This is a sample integration of react-d3-graph, in this particular case all the rd3g config properties
 * will be exposed in a form in order to allow on the fly graph configuration.
 * The data and configuration that are initially loaded can be manipulated via queryParameter on this same
 * Sandbox. You can dynamically load different datasets that are under the `data` folder. If you want
 * for instance to load the data and config under the `small` folder you just need to append "?data=small"
 * to the url when accessing the sandbox.
 */

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        const { config: configOverride, data, fullscreen } = sandboxData;
        const config = Object.assign(defaultConfig, configOverride);
        const schemaProps = utils.generateFormSchema(config, "", {});
        const crntSchemaProps = utils.generateFormSchema(config, "", {});

        const schema = {
            type: "object",
            properties: schemaProps,
        };
        this.compSelectInRtsp = this.compSelectInRtsp.bind(this);
        this.compSelectInHls = this.compSelectInHls.bind(this);
        this.compSelectInRtmp = this.compSelectInRtmp.bind(this);
        this.compSelectInFile = this.compSelectInFile.bind(this);

        this.compSelectOutRtsp = this.compSelectOutRtsp.bind(this);
        this.compSelectOutHls = this.compSelectOutHls.bind(this);
        this.compSelectOutRtmp = this.compSelectOutRtmp.bind(this);
        this.compSelectOutFile = this.compSelectOutFile.bind(this);
        this.compSelectOutHttp = this.compSelectOutHttp.bind(this);

        this.compSelectTranscoder = this.compSelectTranscoder.bind(this);
        this.compSelectDistStore = this.compSelectDistStore.bind(this);
        this.addComponent = this.addComponent.bind(this);
        this.onClickOpenFile = this.onClickOpenFile.bind(this);
        this.onClickSaveFile = this.onClickSaveFile.bind(this);
        this.onClickGenCmd = this.onClickGenCmd.bind(this);

        this.state = {
            config,
            generatedConfig: {},
            data,
            fullscreen,
            opMode: "None",
            prevSelNode: null,
            editNode: null,
        };
    }

    onClickGraph = () => console.info("Clicked the graph");

    onClickNode = id => {
        //!this.state.config.collapsible && window.alert(`Clicked node ${id}`);
        // NOTE: below sample implementation for focusAnimation when clicking on node
        //this.setState({
        //    data: {
        //        ...this.state.data,
        //        focusedNodeId: this.state.data.focusedNodeId !== id ? id : null,
        //    },
        //});

        var idx = this.state.data.nodes.findIndex(x => x.id === id);
        if (idx != null) {
            var node = this.state.data.nodes[idx];

            if (this.state.opMode == "CONNODE") {
                if (this.state.prevSelNode == null) {
                    this.setState({ prevSelNode: id });
                } else {
                    this.state.data.links.push({
                        source: this.state.prevSelNode,
                        target: id,
                    });
                    this.setState({ data: this.state.data, prevSelNode: null });
                }
            } else if (this.state.opMode == "DELNODE") {
                if (node.name != "SETTINGS") {
                    this.state.data.nodes.splice(idx, 1);
                    const links = this.state.data.links.filter(l => l.source !== id && l.target !== id);
                    const data = { nodes: this.state.data.nodes, links };
                    this.setState({ data });
                }
            } else if (this.state.opMode == "SETPROP") {
                if (node != null && node.name != null) {
                    this.setState({ editNode: id });
                }
            }
        }
    };

    onRightClickNode = (event, id) => {
        event.preventDefault();
        window.alert(`RIGHT clicked node ${id}`);
    };

    onClickLink = (source, target) => {
        window.alert(`Clicked link between ${source} and ${target}`);
        if (this.state.opMode == "DELCON") {
            const links = this.state.data.links.filter(l => l.source !== source && l.target !== target);
            const data = { nodes: this.state.data.nodes, links };
            this.setState({ data });
        }
    };

    onRightClickLink = (event, source, target) => {
        event.preventDefault();
        window.alert(`RIGHT clicked link between ${source} and ${target}`);
    };

    onMouseOverNode = id => console.info(`Do something when mouse is over node (${id})`);

    onMouseOutNode = id => console.info(`Do something when mouse is out of node (${id})`);

    onMouseOverLink = (source, target) =>
        console.info(`Do something when mouse is over link between ${source} and ${target}`);

    onMouseOutLink = (source, target) =>
        console.info(`Do something when mouse is out of link between ${source} and ${target}`);

    /**
     * Sets on/off fullscreen visualization mode.
     */
    onToggleFullScreen = () => {
        const fullscreen = !this.state.fullscreen;

        this.setState({ fullscreen });
    };

    connectNodes = () => {
        //this.state.opMode = "CONNODE";
        this.setState({ opMode: "CONNODE", prevSelNode: null });
    };
    deleteConnection = () => {
        //this.state.opMode = "DELCON";
        this.setState({ opMode: "DELCON", prevSelNode: null });
    };
    deleteNode = () => {
        this.state.opMode = "DELNODE";
    };
    setProp = () => {
        this.setState({ opMode: "SETPROP", prevSelNode: null });
    };

    onClickOpenFile() {
        console.log(this.state.data);
    }
    onClickSaveFile() {
        console.log(this.state.data);
    }
    onClickGenCmd() {
        const codeGen = new CodeGen();
        var cmd = codeGen.exec(this.state.data);
        console.log(cmd);
    }

    /**
     * If you have moved nodes you will have them restore theirs positions
     * when you call resetNodesPositions.
     */
    resetNodesPositions = () => this.refs.graph.resetNodesPositions();

    addComponent = (name, category) => {
        if (this.state.data.nodes && this.state.data.nodes.length) {
            const maxIndex = this.state.data.nodes.length - 1;
            const minIndex = 0;
            let i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
            let nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
            const newNode = name + ` ${this.state.data.nodes.length}`;
            var schemeidx = schemas.compSchemas.findIndex(x => x.id === name);
            var formData = schemas.compSchemas[schemeidx].formData;
            this.state.data.nodes.push({ id: newNode, name: name, category: category, formData: formData });

            this.setState({ data: this.state.data, editNode: newNode });
        } else {
            console.info("Should not come here. Settings node should be the first node.");
        }
    };

    _buildGraphConfig = data => {
        let config = {};
        let schemaPropsValues = {};

        for (let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            utils.setValue(config, k, data.formData[k]);
            // Set new values for schema of jsonform
            schemaPropsValues[k] = {};
            schemaPropsValues[k]["default"] = data.formData[k];
        }

        return { config, schemaPropsValues };
    };

    _buildFormConfig = data => {
        let config = {};
        let schemaPropsValues = {};

        for (let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            utils.setValue(config, k, data.formData[k]);
            // Set new values for schema of jsonform
            schemaPropsValues[k] = {};
            schemaPropsValues[k]["default"] = data.formData[k];
        }

        return { config, schemaPropsValues };
    };

    onFormChange = data => {};

    onclickReset = () => {};

    onSubmit = data => {
        if (this.state.editNode != null) {
            var idx = this.state.data.nodes.findIndex(x => x.id === this.state.editNode);
            if (idx != null) {
                this.state.data.nodes[idx].formData = data.formData;
                this.setState({ data: this.state.data });
            }
        }
    };
    onClickSubmit = () => {
        // Hack for allow submit button to live outside jsonform
        document.body.querySelector(".invisible-button").click();
    };

    resetGraphConfig = () => {
        const generatedConfig = {};

        const schemaProps = utils.generateFormSchema(defaultConfig, "", {});

        const schema = {
            type: "object",
            properties: schemaProps,
        };

        this.setState({
            config: defaultConfig,
            generatedConfig,
            schema,
        });
    };

    /**
     * This function decorates nodes and links with positions. The motivation
     * for this function its to set `config.staticGraph` to true on the first render
     * call, and to get nodes and links statically set to their initial positions.
     * @param  {Object} nodes nodes and links with minimalist structure.
     * @return {Object} the graph where now nodes containing (x,y) coords.
     */
    decorateGraphNodesWithInitialPositioning = nodes => {
        return nodes.map(n =>
            Object.assign({}, n, {
                x: n.x || Math.floor(Math.random() * 500),
                y: n.y || Math.floor(Math.random() * 500),
            })
        );
    };

    /**
     * Update graph data each time an update is triggered
     * by JsonTree
     * @param {Object} data update graph data (nodes and links)
     */
    onGraphDataUpdate = data => this.setState({ data });

    /**
     * Build common piece of the interface that contains some interactions such as
     * fullscreen, play/pause, + and - buttons.
     */
    buildCommonInteractionsPanel = () => {
        const btnStyle = {
            cursor: this.state.config.staticGraph ? "not-allowed" : "pointer",
        };

        const fullscreen = this.state.fullscreen ? (
            <span className="cross-icon" onClick={this.onToggleFullScreen}>
                ❌
            </span>
        ) : (
            <button onClick={this.onToggleFullScreen} className="btn btn-default btn-margin-left">
                Fullscreen
            </button>
        );

        return (
            <div>
                <button onClick={this.connectNodes} className="btn btn-default btn-margin-left" style={btnStyle}>
                    Add Conn
                </button>
                <button onClick={this.deleteConnection} className="btn btn-default btn-margin-left" style={btnStyle}>
                    Del Conn
                </button>
                <button onClick={this.deleteNode} className="btn btn-default btn-margin-left" style={btnStyle}>
                    Del Node
                </button>
                <button onClick={this.setProp} className="btn btn-default btn-margin-left" style={btnStyle}>
                    Set Prop
                </button>
            </div>
        );
    };

    compSelectInRtmp = () => {
        console.info("Clicked InRtmp");
        this.addComponent("RTMP-IN", "input");
    };
    compSelectInRtsp = () => {
        console.info("Clicked InRtsp");
        this.addComponent("RTSP-IN", "input");
    };
    compSelectInFile = () => {
        console.info("Clicked InFile");
        this.addComponent("FILE-IN", "input");
    };
    compSelectInHls = () => {
        console.info("Clicked InHls");
        this.addComponent("HLS-IN", "input");
    };

    compSelectOutRtmp = () => {
        console.info("Clicked OutRtmp");
        this.addComponent("RTMP-OUT", "output");
    };
    compSelectOutRtsp = () => {
        console.info("Clicked OutRtsp");
        this.addComponent("RTSP-OUT", "output");
    };
    compSelectOutFile = () => {
        console.info("Clicked RTMP");
        this.addComponent("FILE-OUT", "output");
    };
    compSelectOutHls = () => {
        console.info("Clicked OutHls");
        this.addComponent("HLS-OUT", "output");
    };
    compSelectOutHttp = () => {
        console.info("Clicked Http ");
        this.addComponent("HTTP-OUT", "output");
    };

    compSelectTranscoder = () => {
        console.info("Clicked Transcoder");
        this.addComponent("TRANSCODER", "transcode");
    };
    compSelectDistStore = () => {
        console.info("Clicked DistStore");
        this.addComponent("DISTSTORE", "output");
    };

    buildComponentListPanel = () => {
        return (
            <Accordion>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Inputs</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <button className="comp-button" onClick={this.compSelectInRtmp}>
                                RTMP
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectInRtsp}>
                                RTSP
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectInFile}>
                                File
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectInHls}>
                                HLS
                            </button>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Transcoder</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <button onClick={this.compSelectTranscoder}>Transcoder</button>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Distributed Storage</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <button onClick={this.compSelectDistStore}>Distributed Storage</button>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Outputs</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>
                            <button className="comp-button" onClick={this.compSelectOutHls}>
                                HLS
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectOutHttp}>
                                HTTP
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectOutRtmp}>
                                RTMP
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectOutRtsp}>
                                RTSP
                            </button>
                        </div>
                        <div>
                            <button className="comp-button" onClick={this.compSelectOutFile}>
                                File
                            </button>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        );
    };
    render() {
        // This does not happens in this sandbox scenario running time, but if we set staticGraph config
        // to true in the constructor we will provide nodes with initial positions
        const data = {
            nodes: this.decorateGraphNodesWithInitialPositioning(this.state.data.nodes),
            links: this.state.data.links,
            focusedNodeId: this.state.data.focusedNodeId,
        };
        var crntSchema = schemas.compSchemas[0].schema;
        var formData = schemas.compSchemas[0].formData;
        var uiSchema = {};
        if (this.state.editNode != null) {
            var idx = this.state.data.nodes.findIndex(x => x.id === this.state.editNode);
            if (idx > 0) {
                var node = this.state.data.nodes[idx];
                formData = this.state.data.nodes[idx].formData;
                var schemeidx = schemas.compSchemas.findIndex(x => x.id === node.name);
                crntSchema = schemas.compSchemas[schemeidx].schema;
            }
        }
        const graphProps = {
            id: "graph",
            data,
            config: this.state.config,
            onClickNode: this.onClickNode,
            onRightClickNode: this.onRightClickNode,
            onClickGraph: this.onClickGraph,
            onClickLink: this.onClickLink,
            onRightClickLink: this.onRightClickLink,
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode,
            onMouseOverLink: this.onMouseOverLink,
            onMouseOutLink: this.onMouseOutLink,
        };

        // @TODO: Only show configs that differ from default ones in "Your config" box

        return (
            <div className="container">
                <div className="container__main_menu">
                    <h3>Main</h3>
                    <div>
                        <button className="file-open-button" onClick={this.onClickOpenFile}>
                            Open
                        </button>
                    </div>
                    <div>
                        <button className="file-save-button" onClick={this.onClickSaveFile}>
                            Save
                        </button>
                    </div>
                    <div>
                        <button className="file-gencmd-button" onClick={this.onClickGenCmd}>
                            Gen Cmd
                        </button>
                    </div>
                </div>
                <div className="container__form_comp_list">
                    <h3>Pipeline Components</h3>
                    {this.buildComponentListPanel()}
                </div>
                <div className="container__graph">
                    {this.buildCommonInteractionsPanel()}
                    <div className="container__graph-area">
                        <Graph ref="graph" {...graphProps} />
                    </div>
                </div>
                <div className="container__form_comp_prop">
                    <h3>Component Properties</h3>
                    <Form
                        className="form-wrapper"
                        schema={crntSchema}
                        uiSchema={uiSchema}
                        formData={formData}
                        onChange={this.refreshGraph}
                        onSubmit={this.onSubmit}
                    >
                        <button className="invisible-button" type="submit" />
                    </Form>
                    <button className="submit-button btn btn-primary" onClick={this.onClickSubmit}>
                        Save
                    </button>
                    <button className="reset-button btn btn-danger" onClick={this.onclickReset}>
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}

class JSONContainer extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.staticData && !reactD3GraphUtils.isDeepEqual(nextProps.data, this.props.data);
    }

    render() {
        return <pre className="json-data-container">{JSON.stringify(this.props.data, null, 2)}</pre>;
    }
}
