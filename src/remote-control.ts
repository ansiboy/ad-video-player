import userData from "./web-server/user-data";
import shelljs from "shelljs";
import { ChildProcess, exec } from "child_process";
import config from "./config";
import * as path from "path";
import fs from "fs";
import errors from "./web-server/controllers/errors";




export default class RemoteControl {
  private static child_process: ChildProcess | null;

  public static start() {
    if (this.child_process != null)
      return;

    let mgrokPath = path.join(__dirname, "../mgrok");

    if (!fs.existsSync(mgrokPath))
      throw errors.pathNotExists(mgrokPath);

    let mgrokWinPath = path.join(mgrokPath, "windows_amd64");
    if (!fs.existsSync(mgrokWinPath))
      throw errors.pathNotExists(mgrokWinPath);
    console.log(userData)
    if (userData.info.remoteControl) {

      exec("mgrok.exe start-all", { cwd: path.join(__dirname, "../mgrok/windows_amd64") }, function (error, stdout, stderr) {
        console.log(error)
        console.log(stdout)
      })

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

  public static stop() {
    if (this.child_process == null)
      return;

    this.child_process.kill();
    this.child_process = null;
  }

  public static isEnable() {
    return userData.info.remoteControl;
  }

  public static enable(value: boolean) {
    if (value) {
      this.start();
      return;
    }

    this.stop();
  }
}

if (userData.info.remoteControl)
  RemoteControl.start();