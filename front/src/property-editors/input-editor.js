"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputEditor = exports.NumberInputEditor = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
class NumberInputEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { propertyValue: props.propertyValue };
    }
    render() {
        let { propertyValue: value } = this.state;
        return react_1.default.createElement(antd_1.InputNumber, { value: value, style: { width: "100%" } });
    }
}
exports.NumberInputEditor = NumberInputEditor;
class InputEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { propertyValue: props.propertyValue };
    }
    render() {
        let { propertyValue: value } = this.state;
        return react_1.default.createElement(antd_1.Input, { value: value, onChange: e => {
                this.props.changed(e.target.value);
            } });
    }
}
exports.InputEditor = InputEditor;
