"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSplitView = void 0;
const common_1 = require("../common");
const ad_view_1 = require("./ad-view");
require("./one-split-view.scss");
/** 单屏广告 */
class OneSplitView extends ad_view_1.AdView {
    className = "single";
    renderChildren() {
        let children = (0, common_1.componentChildrenArray)(this.props.children);
        return children[0];
    }
}
exports.OneSplitView = OneSplitView;
