"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.getAllList = exports.login = void 0;
const antd_1 = require("antd");
const http_1 = __importDefault(require("../utils/http"));
/**
 * 登录
 * @date 2022-11-04
 * @param {string} values:{username:string
 * @param {string} password:string}
 * @returns {token:string}
 */
const login = async (values) => {
    return (0, http_1.default)('/api/user/login', {
        method: 'POST',
        body: values
    });
};
exports.login = login;
/**
 * 获取所有上传列表
 * @date 2022-11-04
 * @param {"video"|"image"} type?:"video"|"image"
 * @returns {string[]}
 */
const getAllList = async (type) => {
    const res = await (0, http_1.default)('/api/media/list', {
        method: 'GET'
    });
    let data = [];
    switch (type) {
        case "image":
            data = res.filter(item => item.endsWith("jpg") || item.endsWith("png") || item.endsWith("jpeg"));
            break;
        case "video":
            data = res.filter(item => item.endsWith("mp4"));
            break;
        default:
            data = [];
            break;
    }
    return data;
};
exports.getAllList = getAllList;
const uploadFile = async (file) => {
    let data = null;
    try {
        const res = await fetch('/api/media/upload', {
            method: 'POST',
            body: file
        });
        data = await res.json();
    }
    catch (err) {
        antd_1.message.error(err.massge);
    }
    return data;
};
exports.uploadFile = uploadFile;
