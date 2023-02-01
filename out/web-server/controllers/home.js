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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaPath = void 0;
const maishu_node_mvc_1 = require("maishu-node-mvc");
const common_1 = require("../common");
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("../../config"));
const errors_1 = __importDefault(require("./errors"));
const maishu_toolkit_1 = require("maishu-toolkit");
const user_data_1 = __importDefault(require("../user-data"));
const decorators_1 = require("../decorators");
const path = __importStar(require("path"));
const remote_control_1 = __importDefault(require("../../remote-control"));
let HomeController = class HomeController {
    medias() {
        if (!fs.existsSync(config_1.default.mediasPhysicalPath))
            throw errors_1.default.pathNotExists(config_1.default.mediasPhysicalPath);
        let files = fs.readdirSync(config_1.default.mediasPhysicalPath);
        const filesList = files.map(item => item);
        return filesList;
    }
    async delete(d) {
        if (!d.name)
            throw errors_1.default.routeDataFieldNull("name");
        const filePath = path.join(config_1.default.mediasPhysicalPath, (0, exports.mediaPath)(d.name));
        if (!fs.existsSync(filePath))
            throw errors_1.default.pathNotExists(config_1.default.mediasPhysicalPath);
        fs.unlinkSync(filePath);
        return {
            status: 200
        };
    }
    async login(d) {
        if (!d.username)
            throw errors_1.default.routeDataFieldNull("username");
        if (!d.password)
            throw errors_1.default.routeDataFieldNull("password");
        if (user_data_1.default.info.user.name != d.username || user_data_1.default.info.user.password != d.password)
            throw errors_1.default.usernameOrPasswordIncorect();
        user_data_1.default.info.token = (0, maishu_toolkit_1.guid)();
        user_data_1.default.save();
        return {
            token: user_data_1.default.info.token
        };
    }
    async changePassword(d) {
        if (!d.username)
            throw errors_1.default.routeDataFieldNull("username");
        if (!d.password)
            throw errors_1.default.routeDataFieldNull("password");
    }
    async logout() {
        user_data_1.default.info.token = "";
        user_data_1.default.save();
    }
    async upload(files) {
        let file = files[0];
        if (!file)
            throw errors_1.default.routeDataFieldNull("files");
        let ext = path.extname(file.filename);
        if (common_1.imageExtNames.indexOf(ext) < 0 && common_1.videoExtNames.indexOf(ext) < 0) {
            throw errors_1.default.fileTypeNotSupported(ext);
        }
        let filePath = path.join(config_1.default.mediasPhysicalPath, file.filename);
        fs.writeFileSync(filePath, file.content);
        return {
            name: `${config_1.default.mgrokDirectoryName}/${file.filename}`
        };
    }
    async getPageData() {
        let pageDataPath = this.getPageDataPath();
        let pageDataText = fs.readFileSync(pageDataPath).toString();
        let pageData = JSON.parse(pageDataText);
        return pageData;
    }
    async savePageData(d) {
        if (!d.pageData)
            throw errors_1.default.routeDataFieldNull("pageData");
        let pageDataPath = this.getPageDataPath();
        fs.writeFileSync(pageDataPath, JSON.stringify(d.pageData));
    }
    async getRemoteControl() {
        return user_data_1.default.info.remoteControl;
    }
    async setRemoteControl(d) {
        if (d.value == null)
            throw errors_1.default.routeDataFieldNull("value");
        remote_control_1.default.enable(d.value);
    }
    getPageDataPath() {
        // let staticDirectory = projectRootDirectory.findDirectory("static");
        // if (!staticDirectory)
        //   throw errors.staticRootDirectoryNotExists();
        // let pageDataPath = staticDirectory.findFile(pageDataFileName);
        // if (!pageDataPath)
        //   throw errors.staticDirectoryNotContainsFile(pageDataFileName);
        if (!fs.existsSync(common_1.pageDataPhysicalPath))
            throw errors_1.default.pathNotExists(common_1.pageDataPhysicalPath);
        return common_1.pageDataPhysicalPath;
    }
    startRemoteController() {
        user_data_1.default.info.remoteControl = true;
        user_data_1.default.save();
        // try {
        //   const getReadFile: any = fs.readFileSync(path.join(__dirname, "../../../user-data.json"));
        //   let data = JSON.parse(getReadFile)
        //   data.remoteControl = true
        //   const newJSON = JSON.stringify(data);
        //   fs.writeFileSync(path.join(__dirname, "../../../user-data.json"), newJSON)
        // } catch (error) {
        //   throw error
        // }
        remote_control_1.default.start();
        return {
            status: 200
        };
    }
    stopRemoteController() {
        user_data_1.default.info.remoteControl = false;
        user_data_1.default.save();
        remote_control_1.default.stop();
        return {
            status: 200
        };
    }
};
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.medias)
], HomeController.prototype, "medias", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.delete),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "delete", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.login),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "login", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.changePassword),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "changePassword", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.logout)
], HomeController.prototype, "logout", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.upload),
    __param(0, decorators_1.files)
], HomeController.prototype, "upload", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.getPageData)
], HomeController.prototype, "getPageData", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.savePageData),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "savePageData", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.getRemoteControl)
], HomeController.prototype, "getRemoteControl", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.setRemoteControl),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "setRemoteControl", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.startRemoteController)
], HomeController.prototype, "startRemoteController", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.stopRemoteController)
], HomeController.prototype, "stopRemoteController", null);
HomeController = __decorate([
    (0, maishu_node_mvc_1.controller)()
], HomeController);
exports.default = HomeController;
/**
 * 媒体路径
 * @date 2022-11-07
 * @param {any} mediaPath:string
 * @returns {any}
 */
const mediaPath = (mediaPath) => {
    if (mediaPath.startsWith(config_1.default.mediasVirtualPath)) //(imagePath.startsWith("/medias/"))
        return mediaPath;
    return `${config_1.default.mediasVirtualPath}/${mediaPath}`;
};
exports.mediaPath = mediaPath;
//# sourceMappingURL=home.js.map