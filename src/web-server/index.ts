import { startServer } from "maishu-node-mvc";
import config from "../config";
import * as path from "path";
import * as url from "url";
import { projectRootDirectory } from "./common";

let server = startServer({
  port: config.webPort,
  websiteDirectory: projectRootDirectory,
  urlRewrite: (rawUrl: string) => {
    let r = url.parse(rawUrl);
    if (!r.pathname)
      return rawUrl;

    let ext = path.extname(r.pathname);
    rawUrl = decodeURI(rawUrl);
    if (ext || rawUrl.startsWith(config.apiRoot))
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