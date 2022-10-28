export let servicePaths = {
    upload: "/media/upload",
    medias: "/media/list",
    login: "/user/login",
    logout: "/user/logout",
    changePassword: "/user/change-password",
    screenList: "/screen/list",
    screenSave: "/screen/save"
}

export let anonymousPaths = {
    login: servicePaths.login
}

export let videoExtNames = [".mp4"];
export let imageExtNames = [".jpg", ".png", ".webp", ".gif"]