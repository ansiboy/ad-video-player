import { VirtualDirectory } from "maishu-node-mvc";
import config from "../config";
import * as path from "path";

export let servicePaths = {
    upload: `${config.apiRoot}/media/upload`,
    medias: `${config.apiRoot}/media/list`,
    delete: `${config.apiRoot}/media/delete`,
    login: `${config.apiRoot}/user/login`,
    logout: `${config.apiRoot}/user/logout`,
    changePassword: `${config.apiRoot}/user/change-password`,
    // screenList: `${config.apiRoot}/screen/list`,
    // screenSave: `${config.apiRoot}/screen/save`,
    getPageData: `${config.apiRoot}/pageData/get`,
    savePageData: `${config.apiRoot}/pageData/save`,
    getRemoteControl: `${config.apiRoot}/remoteControl/get`,
    setRemoteControl: `${config.apiRoot}/remoteControl/set`,
}

export const anonymousPaths = {
    login: servicePaths.login
}

export const videoExtNames = [".mp4"];
export const imageExtNames = [".jpg", ".png", ".webp", ".gif"];
export const pageDataPhysicalPath = path.join(__dirname, "../../screen.json");

export const projectRootDirectory = new VirtualDirectory(__dirname);
projectRootDirectory.setPath("/static/medias", path.join(__dirname, "../../medias"));
projectRootDirectory.setPath("/static", path.join(__dirname, "../../build"))