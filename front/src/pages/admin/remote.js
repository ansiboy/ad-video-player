"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
function RemotePage() {
    return react_1.default.createElement(antd_1.Form, { name: "basic", labelCol: { span: 8 }, wrapperCol: { span: 16 }, initialValues: { remember: true }, autoComplete: "off", style: { width: 600, marginLeft: 10, marginTop: 20 } },
        react_1.default.createElement(antd_1.Form.Item, { label: "\u8FD0\u884C\u8FDC\u7A0B\u767B\u5F55", valuePropName: "checked" },
            react_1.default.createElement(antd_1.Switch, { checked: true })),
        react_1.default.createElement(antd_1.Form.Item, { label: "\u8FDC\u7A0B\u5730\u5740" }, "http://47.243.143.36:42986"));
}
exports.default = RemotePage;
