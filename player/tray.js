// import * as path from "path";
// import { app, Menu, MenuItem, MenuItemConstructorOptions, nativeImage, Tray } from "electron";
// import auto from "./auto-run";
// app.whenReady().then(async () => {
//     const image_path = path.join(__dirname, 'public/tray.png')
//     let icon = nativeImage.createFromPath(image_path)
//     icon = icon.resize({ width: 16, height: 16 })
//     let tray = new Tray(image_path);
//     let menuItems: (MenuItemConstructorOptions | MenuItem)[] = [
//         {
//             label: '退出',
//             click() {
//                 app.exit()
//             }
//         }
//     ]
//     let isAuto = await auto.isEnabled()
//     let bootItem: MenuItemConstructorOptions = {
//         label: '开机启动',
//         type: 'checkbox',
//         click(item) {
//             bootItem.checked = !bootItem.checked
//             if (item.checked) {
//                 auto.enable()
//             } else {
//                 auto.disable()
//             }
//             tray.setContextMenu(menu);
//         },
//         checked: isAuto
//     }
//     menuItems.unshift(bootItem);
//     let menu = Menu.buildFromTemplate(menuItems);
//     tray.setContextMenu(menu);
// })
