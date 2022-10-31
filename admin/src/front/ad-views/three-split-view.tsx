import React from "react";
import { componentChildrenArray } from "../common";
import { AdView } from "./ad-view";
import "./three-split-view.scss";

/** 三屏广告 */
export class ThreeSplitView extends AdView {
    className: string = "three";
    renderChildren(): React.ReactNode {
        let children = componentChildrenArray(this.props.children);
        return <>
            <div className="item">
                {children[0]}
            </div>
            <div className="item">
                {children[1]}
            </div>
            <div className="item">
                {children[2]}
            </div>
        </>
    }

}