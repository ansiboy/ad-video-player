
import "./auto-run";
import "./main-win";
import { app } from "electron";
import "./web-server/index";
import "./remote-control";

app.requestSingleInstanceLock();
app.on('second-instance', function () {
    app.quit();
})
