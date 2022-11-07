import { controller, action, routeData } from "maishu-node-mvc";
import { imageExtNames, pageDataFileName, projectRootDirectory, servicePaths, videoExtNames } from "../common";
import * as fs from "fs";
import config from "../../config";
import errors from "./errors";
import { guid } from "maishu-toolkit";
import UserData from "../user-data";
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

    if (UserData.info.user.name != d.username || UserData.info.user.password != d.password)
      throw errors.usernameOrPasswordIncorect()

    UserData.info.token = guid();
    UserData.save();
    return {
      token: UserData.info.token
    }
  }

  @action(servicePaths.changePassword)
  async changePassword(@routeData d: { username: string, password: string }) {
    if (!d.username)
      throw errors.routeDataFieldNull("username");
    if (!d.password)
      throw errors.routeDataFieldNull("password");

  }

  @action(servicePaths.logout)
  async logout() {
    UserData.info.token = "";
    UserData.save();
  }

  @action(servicePaths.upload)
  async upload(@files files: FormPart[]) {
    let file = files[0];
    if (!file)
      throw errors.routeDataFieldNull("files");

    let ext = path.extname(file.filename);
    if (imageExtNames.indexOf(ext) < 0 && videoExtNames.indexOf(ext) < 0) {
      throw errors.fileTypeNotSupported(ext);
    }

    let filePath = path.join(__dirname, "../../medias", file.filename);
    fs.writeFileSync(filePath, file.content);
    return {
      status: 200
    }
  }

  @action(servicePaths.getPageData)
  async getPageData() {
    let pageDataPath = this.getPageDataPath();
    let pageDataText = fs.readFileSync(pageDataPath).toString();
    let pageData = JSON.parse(pageDataText);
    return pageData;
  }

  @action(servicePaths.savePageData)
  async savePageData(@routeData d: { pageData: any }) {
    if (!d.pageData) throw errors.routeDataFieldNull("pageData");

    let pageDataPath = this.getPageDataPath();
    fs.writeFileSync(pageDataPath, JSON.stringify(d.pageData));
  }

  @action(servicePaths.getRemoteControl)
  async getRemoteControl() {
    return UserData.info.remoteControl;
  }

  @action(servicePaths.setRemoteControl)
  async setRemoteControl(@routeData d: { value: boolean }) {
    if (d.value == null)
      throw errors.routeDataFieldNull("value");

    UserData.info.remoteControl = d.value;
    UserData.save();
  }

  private getPageDataPath(): string {
    let staticDirectory = projectRootDirectory.findDirectory("static");
    if (!staticDirectory)
      throw errors.staticRootDirectoryNotExists();

    let pageDataPath = staticDirectory.findFile(pageDataFileName);
    if (!pageDataPath)
      throw errors.staticDirectoryNotContainsFile(pageDataFileName);

    return pageDataPath;
  }

}