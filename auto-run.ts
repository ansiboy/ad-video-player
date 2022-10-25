import AutoLaunch from 'auto-launch';
import { app } from "electron";
import * as path from 'path'
import * as fs from 'fs'

let electronPath = path.join(
    app.getAppPath(),
    'node_modules/electron/dist/electron.exe'
)
let vbs = `Set ws = CreateObject("Wscript.Shell")
      ws.run "cmd /c ${electronPath} ${app.getAppPath()}",0`
let autoRunPath = path.join(__dirname, 'auto-run.vbs')
fs.writeFileSync(autoRunPath, vbs)
let auto = new AutoLaunch({
    name: 'Minecraft',
    path: autoRunPath
})

export default auto;
