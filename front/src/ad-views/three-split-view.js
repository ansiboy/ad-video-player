"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeSplitView = void 0;
const react_1 = __importDefault(require("react"));
const common_1 = require("../common");
const ad_view_1 = require("./ad-view");
require("./three-split-view.scss");
/** 三屏广告 */
class ThreeSplitView extends ad_view_1.AdView {
    className = "three";
    renderChildren() {
        let children = (0, common_1.componentChildrenArray)(this.props.children);
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "item" }, children[0]),
            react_1.default.createElement("div", { className: "item" }, children[1]),
            react_1.default.createElement("div", { className: "item" }, children[2]));
    }
}
exports.ThreeSplitView = ThreeSplitView;
