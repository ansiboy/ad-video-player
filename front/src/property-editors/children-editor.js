"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenEditor = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const type_names_1 = require("../type-names");
class ChildrenEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { propertyValue: props.propertyValue };
    }
    render() {
        let value = this.state.propertyValue || [];
        return react_1.default.createElement(antd_1.List, { dataSource: value, renderItem: childComponentData => {
                return react_1.default.createElement(antd_1.List.Item, null,
                    react_1.default.createElement(antd_1.Radio.Group, { value: childComponentData.type, onChange: e => {
                            childComponentData.type = e.target.value;
                            this.props.changed(value);
                        }, style: { width: "100%" } },
                        react_1.default.createElement(antd_1.Space, { direction: "vertical", style: { width: "100%" } },
                            react_1.default.createElement(antd_1.Radio, { value: type_names_1.typeNames.EmptyPlayer }, "\u7A7A\u767D"),
                            react_1.default.createElement(antd_1.Radio, { value: type_names_1.typeNames.ImagePlayer },
                                "\u56FE\u7247",
                                react_1.default.createElement(antd_1.Button, { type: "link" }, "\u7F16\u8F91")),
                            react_1.default.createElement(antd_1.Radio, { value: type_names_1.typeNames.VideoPlayer },
                                "\u89C6\u9891",
                                react_1.default.createElement(antd_1.Button, { type: "link" }, "\u7F16\u8F91")))));
            } });
    }
}
exports.ChildrenEditor = ChildrenEditor;
