import { Errors } from "maishu-toolkit";

class MyErrors extends Errors {
    unsupportedScreenType(screenType: string) {
        let msg = `Screen type '${screenType}' is not supported.`;
        let error = new Error(msg);
        let name: keyof MyErrors = "unsupportedScreenType";
        error.name = name;
        return error;
    }
    componentDataNotExists(componentId: string) {
        let msg = `Component data '${componentId}' is not exists.`;
        let error = new Error(msg);
        let name: keyof MyErrors = "componentDataNotExists";
        error.name = name;
        return error;
    }
}

let errors = new MyErrors();
export default errors;