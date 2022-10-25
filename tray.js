"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const electron_1 = require("electron");
const auto_run_1 = __importDefault(require("./auto-run"));
electron_1.app.whenReady().then(async () => {
    const image_path = path.join(__dirname, 'public/tray.png');
    let icon = electron_1.nativeImage.createFromPath(image_path);
    icon = icon.resize({ width: 16, height: 16 });
    let tray = new electron_1.Tray(image_path);
    let menuItems = [
        {
            label: '退出',
            click() {
                electron_1.app.exit();
            }
        }
    ];
    let isAuto = await auto_run_1.default.isEnabled();
    let bootItem = {
        label: '开机启动',
        type: 'checkbox',
        click(item) {
            bootItem.checked = !bootItem.checked;
            if (item.checked) {
                auto_run_1.default.enable();
            }
            else {
                auto_run_1.default.disable();
            }
            tray.setContextMenu(menu);
        },
        checked: isAuto
    };
    menuItems.unshift(bootItem);
    let menu = electron_1.Menu.buildFromTemplate(menuItems);
    tray.setContextMenu(menu);
});
