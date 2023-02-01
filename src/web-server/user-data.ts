import * as fs from "fs";
import * as path from "path";

export interface UserDataJSON {
  "user": {
    "name": string,
    "password": string
  },
  token?: string,
  remoteControl?: boolean
}

const DefaultUserName = "admin";
const DefaultPassword = "000000";

let userDataFilePath = path.join(__dirname, "../../user-data.json");
if (!fs.existsSync(userDataFilePath)) {
  let d: UserDataJSON = {
    user: {
      name: DefaultUserName,
      password: DefaultPassword,
    }
  }
  let content = Buffer.from(JSON.stringify(d));
  fs.writeFileSync(userDataFilePath, content, { flag: "a" });
}
//throw errors.fileNotExists(userDataFilePath)

export default class UserData {

  static info: UserDataJSON = JSON.parse(fs.readFileSync(userDataFilePath) as any);
  static save() {
    let text = JSON.stringify(UserData.info);
    fs.writeFileSync(path.join(__dirname, "../../user-data.json"), text);
  }
}