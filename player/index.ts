
import "./auto-run";
// import "./tray";
import "./main-win";
import { app } from "electron";
import "./web-server/index";
import userData from "./web-server/user-data.json";
import shelljs from "shelljs";

app.requestSingleInstanceLock();
app.on('second-instance', function () {
    app.quit();
})

if (userData.remoteControl) {
    shelljs.exec("./mgrok/windows_amd64/mgrok.exe start-all")
}