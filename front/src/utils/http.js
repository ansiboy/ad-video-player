"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const config_1 = require("./config");
//参数转换
const queryString = (params) => '?' + Object
    .keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
const request = async (url, config) => {
    url = config_1.baseUrl + url;
    if (config.method === "GET" && config.parms)
        url = url + queryString(config.parms);
    if (config.method === "POST" && config.body)
        config.body = JSON.stringify(config.body);
    config.headers = config.headers || {};
    if (localStorage.getItem("token"))
        config.headers["token"] = localStorage.getItem("token");
    config.headers["content-type"] = "application/json";
    return new Promise((resolve, reject) => fetch(url, config).then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
            antd_1.message.error(data.message);
            return;
        }
        resolve(data);
    }).catch(err => {
        console.log(err);
        reject(err);
    }));
};
exports.default = request;
