import config from "../config";

export let servicePaths = {
    upload: `${config.apiRoot}/media/upload`,
    medias: `${config.apiRoot}/media/list`,
    login: `${config.apiRoot}/user/login`,
    logout: `${config.apiRoot}/user/logout`,
    changePassword: `${config.apiRoot}/user/change-password`,
    screenList: `${config.apiRoot}/screen/list`,
    screenSave: `${config.apiRoot}/screen/save`
}

export let anonymousPaths = {
    login: servicePaths.login
}

export let videoExtNames = [".mp4"];
export let imageExtNames = [".jpg", ".png", ".webp", ".gif"]