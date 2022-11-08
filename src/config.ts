import * as path from "path";

const mediasDirectoryName = "medias";
let config = {
    webPort: 42986,
    apiRoot: "/api",
    mgrokDirectoryName: mediasDirectoryName,
    mediasPhysicalPath: path.join(__dirname, `../${mediasDirectoryName}`)
}

export default config;