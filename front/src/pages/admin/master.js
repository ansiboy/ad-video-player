"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
require("./master.scss");
const common_1 = require("../../common");
require("antd/dist/antd.css");
const { Sider, Content, Footer, Header } = antd_1.Layout;
function MasterPage() {
    let navigate = (0, react_router_dom_1.useNavigate)();
    return react_1.default.createElement(antd_1.Layout, { style: { width: "100%", height: "100%", position: "absolute" } },
        react_1.default.createElement(Sider, { width: 140 },
            react_1.default.createElement(antd_1.Menu, { style: { height: "calc(100% - 80px)" }, onClick: e => {
                    navigate(e.key);
                }, items: [
                    { key: common_1.paths.admin.edit, icon: react_1.default.createElement(icons_1.WindowsOutlined, null), label: "屏幕设计" },
                    { key: common_1.paths.admin.password, icon: react_1.default.createElement(icons_1.LockOutlined, null), label: "修改密码" },
                    { key: common_1.paths.admin.remote, icon: react_1.default.createElement(icons_1.ApiOutlined, null), label: "远程控制" }
                ] }),
            react_1.default.createElement(Footer, { style: { paddingLeft: 0, paddingRight: 0, textAlign: "center", background: "white" } },
                react_1.default.createElement(antd_1.Button, { type: "primary" }, "\u9000\u51FA"))),
        react_1.default.createElement(antd_1.Layout, null,
            react_1.default.createElement(Content, { style: { backgroundColor: "white" } },
                react_1.default.createElement(react_router_dom_1.Outlet, null))));
}
exports.default = MasterPage;
