import * as fs from "fs";
import * as path from "path";
import errors from "./controllers/errors";

export interface UserDataJSON {
  "user": {
    "name": string,
    "password": string
  },
  "token": string,
  "remoteControl": boolean
}


let userDataFilePath = path.join(__dirname, "../../user-data.json");
if (!fs.existsSync(userDataFilePath)) throw errors.fileNotExists(userDataFilePath)

export default class UserData {

  static info: UserDataJSON = JSON.parse(fs.readFileSync(userDataFilePath) as any);
  static save() {
    let text = JSON.stringify(UserData.info);
    fs.writeFileSync(path.join(__dirname, "../../user-data.json"), text);
  }
}