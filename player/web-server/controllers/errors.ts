import { Errors as BaseErrors } from "maishu-toolkit";
class Errors extends BaseErrors {
    pathNotExists(path: string) {
        let msg = `Path '${path}' is not exists`;
        let error = new Error(msg);
        return error;
    }
    usernameOrPasswordIncorect() {
        let msg = `User name or password incorect.`;
        let error = new Error(msg);
        return error;
    }
    notFindBoundaryInContentType(contentType: string) {
        let msg = `Can not find boundary in content type ${contentType}.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notFindBoundaryInContentType.name;
        return error;
    }
    fileTypeNotSupported(fileType: string) {
        let msg = `File type '${fileType}' is not supported.`;
        let error = new Error(msg);
        error.name = Errors.prototype.fileTypeNotSupported.name;
        return error;
    }
}

let errors = new Errors();
export default errors;