"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = void 0;
const antd_1 = require("antd");
function showError(error) {
    antd_1.message.error(error.message);
}
exports.showError = showError;
