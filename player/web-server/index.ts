import { startServer, VirtualDirectory } from "maishu-node-mvc";
import config from "../config";
import * as path from "path";
let dir = new VirtualDirectory(__dirname);
console.log(__dirname);
dir.setPath("/static", path.join(__dirname, "../build"));

let server = startServer({
    port: config.webPort,
    websiteDirectory: dir,
}, "mvc");

let contentTypes = server.requestProcessors.staticProcessor.contentTypes;
contentTypes[".ico"] = "image/x-icon";
contentTypes[".mp4"] = "video/mp4";

delete server.requestProcessors.fileProcessor.processors[".js"];
delete server.requestProcessors.fileProcessor.processors[".json"];