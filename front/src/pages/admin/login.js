"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const icons_1 = require("@ant-design/icons");
require("antd/dist/antd.css");
const common_1 = require("../../common");
require("./login.scss");
const user_1 = require("../../services/user");
function LoginPage() {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const onFinish = (values) => {
        console.log('Success:', values);
        (0, user_1.login)(values).then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                navigate(common_1.paths.admin.edit);
            }
        });
    };
    return (react_1.default.createElement("div", { className: 'login-wrap' },
        react_1.default.createElement("div", { className: 'login' },
            react_1.default.createElement("div", { className: 'login-title' }, "\u767B\u5F55"),
            react_1.default.createElement("div", { className: 'login-content' },
                react_1.default.createElement(antd_1.Form, { name: 'login', onFinish: onFinish, autoComplete: 'off' },
                    react_1.default.createElement(antd_1.Form.Item, { name: 'username', rules: [{ required: true, message: '请输入登录账号!' }] },
                        react_1.default.createElement(antd_1.Input, { placeholder: '\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7', prefix: react_1.default.createElement(icons_1.UserOutlined, { className: 'site-form-item-icon' }) })),
                    react_1.default.createElement(antd_1.Form.Item, { name: 'password', rules: [
                            { required: true, message: '请输入登录密码!' },
                            { max: 16, message: '密码长度在6-16位之间' },
                            { min: 6, message: '密码长度在6-16位之间' }
                        ] },
                        react_1.default.createElement(antd_1.Input.Password, { placeholder: '\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801', prefix: react_1.default.createElement(icons_1.LockOutlined, { className: 'site-form-item-icon' }) })),
                    react_1.default.createElement(antd_1.Form.Item, null,
                        react_1.default.createElement(antd_1.Button, { type: 'primary', htmlType: 'submit', style: { marginTop: 10, width: '100%' } }, "\u767B\u5F55")))))));
}
exports.default = LoginPage;
