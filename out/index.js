"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./auto-run");
require("./main-win");
const electron_1 = require("electron");
require("./web-server/index");
require("./remote-control");
electron_1.app.requestSingleInstanceLock();
electron_1.app.on('second-instance', function () {
    electron_1.app.quit();
});
//# sourceMappingURL=index.js.map