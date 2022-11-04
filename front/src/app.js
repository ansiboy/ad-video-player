"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./app.scss");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const common_1 = require("./common");
const master_1 = __importDefault(require("./pages/admin/master"));
const edit_1 = __importDefault(require("./pages/admin/edit"));
const password_1 = __importDefault(require("./pages/admin/password"));
const remote_1 = __importDefault(require("./pages/admin/remote"));
const login_1 = __importDefault(require("./pages/admin/login"));
const home_1 = __importDefault(require("./pages/home"));
function App(props) {
    return react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: common_1.paths.home, element: react_1.default.createElement(home_1.default, { componentData: props.componentData }) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: common_1.paths.admin.login, element: react_1.default.createElement(login_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { element: react_1.default.createElement(master_1.default, null) },
            react_1.default.createElement(react_router_dom_1.Route, { path: common_1.paths.admin.edit, element: react_1.default.createElement(edit_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: common_1.paths.admin.password, element: react_1.default.createElement(password_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: common_1.paths.admin.remote, element: react_1.default.createElement(remote_1.default, null) })));
}
exports.default = App;
