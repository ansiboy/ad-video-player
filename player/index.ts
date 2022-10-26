
import "./auto-run";
// import "./tray";
import "./main-win";
import { app } from "electron";

app.requestSingleInstanceLock();
app.on('second-instance', function () {
    app.quit();
})