"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_toolkit_1 = require("maishu-toolkit");
class MyErrors extends maishu_toolkit_1.Errors {
    unsupportedScreenType(screenType) {
        let msg = `Screen type '${screenType}' is not supported.`;
        let error = new Error(msg);
        let name = "unsupportedScreenType";
        error.name = name;
        return error;
    }
    componentDataNotExists(componentId) {
        let msg = `Component data '${componentId}' is not exists.`;
        let error = new Error(msg);
        let name = "componentDataNotExists";
        error.name = name;
        return error;
    }
}
let errors = new MyErrors();
exports.default = errors;
