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

    // private instance: FourSplitView;

    // constructor(props: FourSplitView["props"]) {
    //     super(props);

    //     this.state = { visible: props.visible };
    //     this.props.views.push(this);
    // }

    // setVisible(value: boolean) {
    //     this.setState({ visible: value });
    // }

    // render(): React.ReactNode {
    //     let { visible } = this.state;
    //     let children = componentChildrenArray(this.props.children);
    //     return <div className="square" style={{ display: visible ? "flex" : "none" }}>
    //         <div>
    //             {children[0]}
    //         </div>
    //         <div>
    //             {children[1]}
    //         </div>
    //         <div>
    //             {children[2]}
    //         </div>
    //         <div>
    //             {children[3]}
    //         </div>
    //     </div>

    // }
}