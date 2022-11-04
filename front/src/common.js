"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPlaySeconds = exports.strings = exports.EditorPageContext = exports.ComponentRelateion = exports.paths = exports.componentChildrenArray = void 0;
const react_1 = __importDefault(require("react"));
function componentChildrenArray(children) {
    if (children == null)
        return [];
    if (Array.isArray(children)) {
        return children;
    }
    return [children];
}
exports.componentChildrenArray = componentChildrenArray;
exports.paths = {
    home: "/",
    admin: {
        login: "/admin/login",
        edit: "/admin/edit",
        password: "/admin/password",
        remote: "/admin/remote",
    }
};
// export let componentSelected = new Callback<{ id: string }>();
exports.ComponentRelateion = react_1.default.createContext(null);
exports.EditorPageContext = react_1.default.createContext(null);
exports.strings = {
    okText: "确定",
    cancelText: "取消"
};
exports.DefaultPlaySeconds = 15;
