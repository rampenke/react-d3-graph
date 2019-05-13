/* eslint-disable valid-jsdoc */
import React from "react";

import "./res/styles/node.css";

const ICON_PATH = "./data/res/images/";

const ICON_TYPES = {
    TRANSCODE: ICON_PATH + "transcode.svg",
    INPUT: ICON_PATH + "file.svg",
    OUTPUT: ICON_PATH + "file.svg",
    SETTINGS: ICON_PATH + "settings.svg",
    CLOUD: ICON_PATH + "transcode.svg",
    LOCAL: ICON_PATH + "transcode.svg",
};

/**
 * Component that renders a person's name and gender, along with icons
 * representing if they have a driver license for bike and / or car.
 * @param {Object} props component props to render.
 */
function Node({ component }) {
    const category = component.categoy;

    return (
        <div className={`flex-container component-node ${category}`}>
            <div className="name">{component.name}</div>

            <div className="flex-container fill-space flex-container-row">
                <div className="fill-space">
                    <div
                        className="icon"
                        style={{
                            backgroundImage: (() => {
                                switch (component.categoy) {
                                    case "input":
                                        return `url('${ICON_TYPES.INPUT}')`;
                                    case "output":
                                        return `url('${ICON_TYPES.OUTPUT}')`;
                                    case "decode":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "encode":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "transcode":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "filter":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "settings":
                                        return `url('${ICON_TYPES.SETTINGS}')`;
                                    default:
                                        return null;
                                }
                            })(),
                        }}
                    />
                </div>

                <div className="icon-bar">
                    {component.isCloud && (
                        <div className="icon" style={{ backgroundImage: `url('${ICON_TYPES.CLOUD}')` }} />
                    )}
                    {component.isLocal && (
                        <div className="icon" style={{ backgroundImage: `url('${ICON_TYPES.LOCAL}')` }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Node;
