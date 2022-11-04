"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
function PasswordPage() {
    return react_1.default.createElement(antd_1.Form, { name: "basic", labelCol: { span: 8 }, wrapperCol: { span: 16 }, initialValues: { remember: true }, autoComplete: "off", style: { width: 600, marginLeft: 10, marginTop: 20 } },
        react_1.default.createElement(antd_1.Form.Item, { label: "\u7528\u6237\u540D", name: "username", rules: [{ required: true, message: '请输入用户名' }] },
            react_1.default.createElement(antd_1.Input, null)),
        react_1.default.createElement(antd_1.Form.Item, { label: "\u5BC6\u7801", name: "password", rules: [{ required: true, message: '请输入密码' }] },
            react_1.default.createElement(antd_1.Input.Password, null)),
        react_1.default.createElement(antd_1.Form.Item, { name: "remember", valuePropName: "checked", wrapperCol: { offset: 8, span: 16 } },
            react_1.default.createElement(antd_1.Checkbox, null, "Remember me")),
        react_1.default.createElement(antd_1.Form.Item, { wrapperCol: { offset: 8, span: 16 } },
            react_1.default.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit")));
}
exports.default = PasswordPage;
