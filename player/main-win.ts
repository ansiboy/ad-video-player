
import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';
import auto from './auto-run';

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
                label: '退出',
                click() {
                    app.exit()
                }
            }
        ]
    }]);
    win.setMenu(menu);
    win.loadFile('build/index.html')
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
