import userinfo from "./user.json";
import * as fs from "fs";

export class User {
    static info = userinfo;
    static save() {
        let text = JSON.stringify(User.info);
        fs.writeFileSync("./user.json", text);
    }
}