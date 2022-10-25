"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainWindow = void 0;
const electron_1 = require("electron");
const auto_run_1 = __importDefault(require("./auto-run"));
let win;
const createWindow = async () => {
    win = new electron_1.BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: { webSecurity: false, devTools: true }
    });
    let isAuto = await auto_run_1.default.isEnabled();
    let menu = electron_1.Menu.buildFromTemplate([{
            label: "菜单",
            submenu: [
                {
                    label: '开机启动',
                    type: 'checkbox',
                    click(item) {
                        if (item.checked) {
                            auto_run_1.default.enable();
                        }
                        else {
                            auto_run_1.default.disable();
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
                        electron_1.app.exit();
                    }
                }
            ]
        }]);
    // win.setMenu(menu);
    win.loadFile('public/index.html');
};
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
function getMainWindow() {
    return win;
}
exports.getMainWindow = getMainWindow;
