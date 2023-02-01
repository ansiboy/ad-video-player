"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = __importDefault(require("./web-server/user-data"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const errors_1 = __importDefault(require("./web-server/controllers/errors"));
class RemoteControl {
    static child_process;
    static start() {
        if (this.child_process != null)
            return;
        let mgrokPath = path.join(__dirname, "../mgrok");
        if (!fs_1.default.existsSync(mgrokPath))
            throw errors_1.default.pathNotExists(mgrokPath);
        let mgrokWinPath = path.join(mgrokPath, "windows_amd64");
        if (!fs_1.default.existsSync(mgrokWinPath))
            throw errors_1.default.pathNotExists(mgrokWinPath);
        console.log(user_data_1.default);
        if (user_data_1.default.info.remoteControl) {
            (0, child_process_1.exec)("mgrok.exe start-all", { cwd: path.join(__dirname, "../mgrok/windows_amd64") }, function (error, stdout, stderr) {
                console.log(error);
                console.log(stdout);
            });
            // try {
            //   const aa = shelljs.cd(mgrokWinPath)
            //   const data = shelljs.exec("./mgrok.exe start-all", { silent: true })
            //   debugger
            // } catch (error) {
            //   debugger
            // }
            // this.child_process = shelljs.exec("./mgrok.exe start-all", { cwd: mgrokWinPath, async: true })
        }
    }
    static stop() {
        if (this.child_process == null)
            return;
        this.child_process.kill();
        this.child_process = null;
    }
    static isEnable() {
        return user_data_1.default.info.remoteControl;
    }
    static enable(value) {
        if (value) {
            this.start();
            return;
        }
        this.stop();
    }
}
exports.default = RemoteControl;
if (user_data_1.default.info.remoteControl)
    RemoteControl.start();
//# sourceMappingURL=remote-control.js.map