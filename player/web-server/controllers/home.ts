import { controller, action, routeData } from "maishu-node-mvc";
import { imageExtNames, servicePaths, videoExtNames } from "../common";
import * as fs from "fs";
import config from "../../config";
import errors from "./errors";
import { guid } from "maishu-toolkit";
import { User } from "../user";
import { files } from "../decorators";
import { FormPart } from "../decorators/form-parse";
import * as path from "path";

@controller()
export default class HomeController {
    @action(servicePaths.medias)
    medias() {
        if (!fs.existsSync(config.medias))
            throw errors.pathNotExists(config.medias);

        let files = fs.readdirSync(config.medias);
        return files;
    }

    @action(servicePaths.login)
    async login(@routeData d: { username: string, password: string }) {
        if (!d.username)
            throw errors.routeDataFieldNull("username");

        if (!d.password)
            throw errors.routeDataFieldNull("password");

        if (User.info.name != d.username || User.info.password != d.password)
            throw errors.usernameOrPasswordIncorect()

        User.info.token = guid();
        User.save();
    }

    @action(servicePaths.logout)
    async logout() {
        User.info.token = "";
        User.save();
    }

    @action(servicePaths.upload)
    async upload(@files files: FormPart[]) {
        let file = files[0];
        if (!file)
            throw errors.routeDataFieldNull("files");

        let ext = path.extname(file.name);
        if (imageExtNames.indexOf(ext) < 0 && videoExtNames.indexOf(ext) < 0) {
            throw errors.fileTypeNotSupported(ext);
        }

        let filePath = path.join(servicePaths.medias, file.name);
        fs.writeFileSync(filePath, file.content);
    }

    @action(servicePaths.screenList)
    async screenList() {

    }

}