"use strict";
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(createProxyMiddleware("/user", {
        target: 'http://127.0.0.1:42986', // 请求的地址
        // changeOrigin: true,
        // pathRewrite: {
        //   "^/user": "/user"
        // }
    }));
    app.use(createProxyMiddleware("/media", {
        target: 'http://127.0.0.1:42986', // 请求的地址
        // changeOrigin: true,
    }));
    app.use(createProxyMiddleware("/medias", {
        target: 'http://127.0.0.1:42986', // 请求的地址
        // changeOrigin: true,
    }));
};
