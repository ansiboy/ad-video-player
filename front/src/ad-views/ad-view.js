"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdView = void 0;
const react_1 = __importDefault(require("react"));
const common_1 = require("../common");
class AdView extends react_1.default.Component {
    children = [];
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }
    play() {
        this.children.forEach(p => {
            p.play();
        });
    }
    pause() {
        this.children.forEach(p => {
            p.pause();
        });
    }
    render() {
        let { visible } = this.state;
        return react_1.default.createElement(common_1.ComponentRelateion.Consumer, null, args => {
            if (args != null && args.children.indexOf(this) < 0) {
                args.children.push(this);
            }
            return react_1.default.createElement(common_1.ComponentRelateion.Provider, { value: { parent: this, children: this.children } },
                react_1.default.createElement("div", { className: this.className, style: { display: visible ? "flex" : "none" } }, this.renderChildren()));
        });
    }
}
exports.AdView = AdView;
