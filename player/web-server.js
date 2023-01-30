"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
const config_1 = __importDefault(require("./config"));
(0, maishu_node_mvc_1.startServer)({
    port: config_1.default.webPort,
    websiteDirectory: __dirname,
});
