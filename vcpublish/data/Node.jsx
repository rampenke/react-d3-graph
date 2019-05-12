/* eslint-disable valid-jsdoc */
import React from "react";

import "./res/styles/node.css";

const ICON_PATH = "./data/res/images/";

const ICON_TYPES = {
    TRANSCODE: ICON_PATH + "transcode.svg",
    INPUT: ICON_PATH + "transcode.svg",
    OUTPUT: ICON_PATH + "transcode.svg",
    CLOUD: ICON_PATH + "transcode.svg",
    LOCAL: ICON_PATH + "transcode.svg",
};

/**
 * Component that renders a person's name and gender, along with icons
 * representing if they have a driver license for bike and / or car.
 * @param {Object} props component props to render.
 */
function Node({ component }) {
    const isInput = component.type === "transcode";

    return (
        <div className={`flex-container component-node ${isInput ? "input" : "output"}`}>
            <div className="name">{component.name}</div>

            <div className="flex-container fill-space flex-container-row">
                <div className="fill-space">
                    <div
                        className="icon"
                        style={{
                            backgroundImage: (() => {
                                switch (component.type) {
                                    case "input":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "output":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
                                    case "transcode":
                                        return `url('${ICON_TYPES.TRANSCODE}')`;
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
