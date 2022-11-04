"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const component_parse_1 = require("../component-parse");
function HomePage(props) {
    if (!props.componentData ||
        (props.componentData.props.children || []).length == 0) {
        return react_1.default.createElement("div", { className: 'text-center', style: { padding: 100 } }, "\u6682\u65E0\u64AD\u653E");
    }
    let c = (0, component_parse_1.parseComponentData)(props.componentData);
    return c;
}
exports.default = HomePage;
