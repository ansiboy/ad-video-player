"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRootDirectory = exports.pageDataFileName = exports.imageExtNames = exports.videoExtNames = exports.anonymousPaths = exports.servicePaths = void 0;
const maishu_node_mvc_1 = require("maishu-node-mvc");
const config_1 = __importDefault(require("../config"));
const path = __importStar(require("path"));
exports.servicePaths = {
    upload: `${config_1.default.apiRoot}/media/upload`,
    medias: `${config_1.default.apiRoot}/media/list`,
    login: `${config_1.default.apiRoot}/user/login`,
    logout: `${config_1.default.apiRoot}/user/logout`,
    changePassword: `${config_1.default.apiRoot}/user/change-password`,
    screenList: `${config_1.default.apiRoot}/screen/list`,
    screenSave: `${config_1.default.apiRoot}/screen/save`,
    getPageData: `${config_1.default.apiRoot}/pageData/get`,
    savePageData: `${config_1.default.apiRoot}/pageData/save`
};
exports.anonymousPaths = {
    login: exports.servicePaths.login
};
exports.videoExtNames = [".mp4"];
exports.imageExtNames = [".jpg", ".png", ".webp", ".gif"];
exports.pageDataFileName = "screen.json";
exports.projectRootDirectory = new maishu_node_mvc_1.VirtualDirectory(__dirname);
exports.projectRootDirectory.setPath("/static/medias", path.join(__dirname, "../medias"));
exports.projectRootDirectory.setPath("/static", path.join(__dirname, "../build"));
//# sourceMappingURL=common.js.map