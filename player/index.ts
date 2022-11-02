
import "./auto-run";
// import "./tray";
import "./main-win";
import { app } from "electron";
import "./web-server/index";

app.requestSingleInstanceLock();
app.on('second-instance', function () {
    app.quit();
})