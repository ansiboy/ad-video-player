import { controller, action, routeData } from "maishu-node-mvc";
import { imageExtNames, pageDataPhysicalPath, projectRootDirectory, servicePaths, videoExtNames } from "../common";
import * as fs from "fs";
import config from "../../config";
import errors from "./errors";
import { guid } from "maishu-toolkit";
import UserData from "../user-data";
import { files } from "../decorators";
import { FormPart } from "../decorators/form-parse";
import * as path from "path";
import RemoteControl from "../../remote-control";

@controller()
export default class HomeController {
  @action(servicePaths.medias)
  medias() {
    if (!fs.existsSync(config.mediasPhysicalPath))
      throw errors.pathNotExists(config.mediasPhysicalPath);

    let files = fs.readdirSync(config.mediasPhysicalPath);
    const filesList = files.map(item => item)
    return filesList;
  }

  @action(servicePaths.delete)
  async delete(@routeData d: { name: string }) {
    if (!d.name)
      throw errors.routeDataFieldNull("name");
    const filePath = path.join(config.mediasPhysicalPath, mediaPath(d.name))
    if (!fs.existsSync(filePath))
      throw errors.pathNotExists(config.mediasPhysicalPath);
    fs.unlinkSync(filePath)
    return {
      status: 200
    };
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

    let filePath = path.join(config.mediasPhysicalPath, file.filename);
    fs.writeFileSync(filePath, file.content);
    return {
      name: `${config.mgrokDirectoryName}/${file.filename}`
    };
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

    RemoteControl.enable(d.value);
  }

  private getPageDataPath(): string {
    // let staticDirectory = projectRootDirectory.findDirectory("static");
    // if (!staticDirectory)
    //   throw errors.staticRootDirectoryNotExists();

    // let pageDataPath = staticDirectory.findFile(pageDataFileName);
    // if (!pageDataPath)
    //   throw errors.staticDirectoryNotContainsFile(pageDataFileName);
    if (!fs.existsSync(pageDataPhysicalPath))
      throw errors.pathNotExists(pageDataPhysicalPath);

    return pageDataPhysicalPath;
  }


  @action(servicePaths.startRemoteController)
  startRemoteController() {

    UserData.info.remoteControl = true
    UserData.save()

    // try {
    //   const getReadFile: any = fs.readFileSync(path.join(__dirname, "../../../user-data.json"));
    //   let data = JSON.parse(getReadFile)
    //   data.remoteControl = true
    //   const newJSON = JSON.stringify(data);
    //   fs.writeFileSync(path.join(__dirname, "../../../user-data.json"), newJSON)
    // } catch (error) {
    //   throw error
    // }
    RemoteControl.start()
    return {
      status: 200
    };
  }

  @action(servicePaths.stopRemoteController)
  stopRemoteController() {

    UserData.info.remoteControl = false;
    UserData.save()

    RemoteControl.stop()
    return {
      status: 200
    };
  }

}

/**
 * ????????????
 * @date 2022-11-07
 * @param {any} mediaPath:string
 * @returns {any}
 */
export const mediaPath = (mediaPath: string): string => {
  if (mediaPath.startsWith(config.mediasVirtualPath)) //(imagePath.startsWith("/medias/"))
    return mediaPath;
  return `${config.mediasVirtualPath}/${mediaPath}`
}


