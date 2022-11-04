import { startServer, VirtualDirectory } from "maishu-node-mvc";
import config from "../config";
import * as path from "path";
import * as url from "url";

let dir = new VirtualDirectory(__dirname);
console.log(__dirname);

dir.setPath("/static/medias", path.join(__dirname, "../medias"));
dir.setPath("/static", path.join(__dirname, "../build"));

let server = startServer({
  port: config.webPort,
  websiteDirectory: dir,
  urlRewrite: (rawUrl: string) => {
    let r = url.parse(rawUrl);
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