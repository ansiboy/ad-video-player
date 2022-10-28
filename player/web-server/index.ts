import { startServer } from "maishu-node-mvc";
import config from "../config";

startServer({
    port: config.webPort,
    websiteDirectory: __dirname,
})