"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const maishu_node_mvc_1 = require("maishu-node-mvc");
const common_1 = require("../common");
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("../../config"));
const errors_1 = __importDefault(require("./errors"));
const maishu_toolkit_1 = require("maishu-toolkit");
const user_1 = require("../user");
const decorators_1 = require("../decorators");
const path = __importStar(require("path"));
let HomeController = class HomeController {
    medias() {
        if (!fs.existsSync(config_1.default.medias))
            throw errors_1.default.pathNotExists(config_1.default.medias);
        let files = fs.readdirSync(config_1.default.medias);
        return files;
    }
    async login(d) {
        if (!d.username)
            throw errors_1.default.routeDataFieldNull("username");
        if (!d.password)
            throw errors_1.default.routeDataFieldNull("password");
        if (user_1.User.info.name != d.username || user_1.User.info.password != d.password)
            throw errors_1.default.usernameOrPasswordIncorect();
        user_1.User.info.token = (0, maishu_toolkit_1.guid)();
        user_1.User.save();
        return {
            token: user_1.User.info.token
        };
    }
    async logout() {
        user_1.User.info.token = "";
        user_1.User.save();
    }
    async upload(files) {
        let file = files[0];
        if (!file)
            throw errors_1.default.routeDataFieldNull("files");
        let ext = path.extname(file.filename);
        if (common_1.imageExtNames.indexOf(ext) < 0 && common_1.videoExtNames.indexOf(ext) < 0) {
            throw errors_1.default.fileTypeNotSupported(ext);
        }
        let filePath = path.join(__dirname, "../../medias", file.filename);
        fs.writeFileSync(filePath, file.content);
        return {
            status: 200
        };
    }
    async screenList() {
    }
    async saveScreen() {
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
    getPageDataPath() {
        let staticDirectory = common_1.projectRootDirectory.findDirectory("static");
        if (!staticDirectory)
            throw errors_1.default.staticRootDirectoryNotExists();
        let pageDataPath = staticDirectory.findFile(common_1.pageDataFileName);
        if (!pageDataPath)
            throw errors_1.default.staticDirectoryNotContainsFile(common_1.pageDataFileName);
        return pageDataPath;
    }
};
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.medias)
], HomeController.prototype, "medias", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.login),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "login", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.logout)
], HomeController.prototype, "logout", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.upload),
    __param(0, decorators_1.files)
], HomeController.prototype, "upload", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.screenList)
], HomeController.prototype, "screenList", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.screenSave)
], HomeController.prototype, "saveScreen", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.getPageData)
], HomeController.prototype, "getPageData", null);
__decorate([
    (0, maishu_node_mvc_1.action)(common_1.servicePaths.savePageData),
    __param(0, maishu_node_mvc_1.routeData)
], HomeController.prototype, "savePageData", null);
HomeController = __decorate([
    (0, maishu_node_mvc_1.controller)()
], HomeController);
exports.default = HomeController;
//# sourceMappingURL=home.js.map