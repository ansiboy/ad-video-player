const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", { 
      target: 'http://127.0.0.1:42986', // 请求的地址
      // changeOrigin: true,
      // pathRewrite: {
      //   "^/user": "/user"
      // }
    })
  );
}
