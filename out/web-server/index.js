"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const maishu_node_mvc_1 = require("maishu-node-mvc");
const config_1 = __importDefault(require("../config"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const common_1 = require("./common");
let server = (0, maishu_node_mvc_1.startServer)({
    port: config_1.default.webPort,
    websiteDirectory: common_1.projectRootDirectory,
    urlRewrite: (rawUrl) => {
        let r = url.parse(rawUrl);
        if (!r.pathname)
            return rawUrl;
        let ext = path.extname(r.pathname);
        rawUrl = decodeURI(rawUrl);
        if (ext || rawUrl.startsWith(config_1.default.apiRoot))
            return rawUrl;
        return "/index.html";
    }
}, "mvc");
let contentTypes = server.requestProcessors.staticProcessor.contentTypes;
contentTypes[".ico"] = "image/x-icon";
contentTypes[".mp4"] = "video/mp4";
delete server.requestProcessors.fileProcessor.processors[".js"];
delete server.requestProcessors.fileProcessor.processors[".json"];
delete server.requestProcessors.fileProcessor.processors[".css"];
//# sourceMappingURL=index.js.map