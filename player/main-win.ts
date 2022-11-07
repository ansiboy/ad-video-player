
import { app, BrowserWindow, Menu, shell } from 'electron';
import auto from './auto-run';
import config from './config';

let win: BrowserWindow;
const createWindow = async () => {
    win = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: { webSecurity: false, devTools: true }
    })

    let isAuto = await auto.isEnabled()
    let menu = Menu.buildFromTemplate([{
        label: "菜单",
        submenu: [
            {
                label: '开机启动',
                type: 'checkbox',
                click(item) {
                    if (item.checked) {
                        auto.enable()
                    } else {
                        auto.disable()
                    }
                },
                checked: isAuto,
            },
            {
                label: "全屏",
                type: "checkbox",
                click(item) {
                    win.setFullScreen(item.checked);
                },
                checked: win.isFullScreen()
            },
            {
                label: "管理后台",
                type: "normal",
                click() {
                    shell.openExternal(`http://127.0.0.1:${config.webPort}/admin/login`)
                }
            },
            {
                label: '退出',
                click() {
                    app.exit()
                }
            }
        ]
    }]);

    win.loadURL(`http://localhost:${config.webPort}/`)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

export function getMainWindow() {
    return win;
}
