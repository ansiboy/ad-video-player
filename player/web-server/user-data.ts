import userData from "../user-data.json";
import * as fs from "fs";

export default class UserData {
    static info = userData;
    static save() {
        let text = JSON.stringify(UserData.info);
        fs.writeFileSync("./user-data.json", text);
    }
}