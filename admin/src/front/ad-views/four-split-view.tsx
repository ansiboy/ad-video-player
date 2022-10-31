import React from "react";
import { componentChildrenArray } from "../common";
import { AdView } from "./ad-view";
import "./four-split-view.scss";


/** 四分屏视图 */
export class FourSplitView extends AdView {

    className: string = "square";

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
            <div className="item">
                {children[3]}
            </div>
        </>
    }
}