"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./auto-run");
// import "./tray";
require("./main-win");
const electron_1 = require("electron");
electron_1.app.requestSingleInstanceLock();
electron_1.app.on('second-instance', function () {
    electron_1.app.quit();
});
