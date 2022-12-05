import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../config";

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://127.0.0.1:${config.webPort}`, // 请求的地址
    }),
    createProxyMiddleware("/medias", {
      target: `http://127.0.0.1:${config.webPort}`, // 请求的地址
    }),
    createProxyMiddleware("/media", {
      target: `http://127.0.0.1:${config.webPort}`, // 请求的地址
    })
  );
}
