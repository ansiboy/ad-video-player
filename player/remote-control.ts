import userData from "./web-server/user-data.json";
import shelljs from "shelljs";
import { ChildProcess } from "child_process";
import config from "./config";
import * as path from "path";
import fs from "fs";
import errors from "./web-server/controllers/errors";
import UserData from "./web-server/user-data";

// let mgrokWinPath


class RemoteControl {
    private static child_process: ChildProcess;

    public static start() {
        if (this.child_process != null)
            return;

        let mgrokPath = path.join(__dirname, config.mgrokDirectoryName);
        if (!fs.existsSync(mgrokPath))
            throw errors.pathNotExists(mgrokPath);

        let mgrokWinPath = path.join(mgrokPath, "windows_amd64");
        if (!fs.existsSync(mgrokWinPath))
            throw errors.pathNotExists(mgrokWinPath);

        if (userData.remoteControl) {
            this.child_process = shelljs.exec("mgrok.exe start-all", { cwd: mgrokWinPath, async: true })
        }
    }

    public static stop() {
        if (this.child_process == null)
            return;

        this.child_process.kill();
        this.child_process = null;
    }

    public static isEnable() {
        return userData.remoteControl;
    }

    public static enable(value: boolean) {
        if (value) {
            this.start();
            return;
        }

        this.stop();
    }
}

if (userData.remoteControl)
    RemoteControl.start();