import { componentChildrenArray } from "../common";
import { AdView } from "./ad-view";

import "./one-split-view.scss";

/** 单屏广告 */
export class OneSplitView extends AdView {

    className: string = "single";

    renderChildren() {
        let children = componentChildrenArray(this.props.children);
        return children[0];
    }

}