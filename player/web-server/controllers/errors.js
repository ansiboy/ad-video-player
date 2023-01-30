"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_toolkit_1 = require("maishu-toolkit");
class Errors extends maishu_toolkit_1.Errors {
    pathNotExists(path) {
        let msg = `Path '${path}' is not exists`;
        let error = new Error(msg);
        return error;
    }
    usernameOrPasswordIncorect() {
        let msg = `User name or password incorect.`;
        let error = new Error(msg);
        return error;
    }
    notFindBoundaryInContentType(contentType) {
        let msg = `Can not find boundary in content type ${contentType}.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notFindBoundaryInContentType.name;
        return error;
    }
    fileTypeNotSupported(fileType) {
        let msg = `File type '${fileType}' is not supported.`;
        let error = new Error(msg);
        error.name = Errors.prototype.fileTypeNotSupported.name;
        return error;
    }
    staticRootDirectoryNotExists() {
        let msg = `Static directory is not exists in the root directory.`;
        let error = new Error(msg);
        error.name = Errors.prototype.staticRootDirectoryNotExists.name;
        return error;
    }
    staticDirectoryNotContainsFile(filename) {
        let msg = `Static directory not contains file '${filename}'.`;
        let error = new Error(msg);
        error.name = Errors.prototype.staticRootDirectoryNotExists.name;
        return error;
    }
    fileNotExists(filePath) {
        let msg = `File path '${filePath}' is not exists.`;
        let error = new Error(msg);
        error.name = Errors.prototype.fileNotExists.name;
        return error;
    }
}
let errors = new Errors();
exports.default = errors;
//# sourceMappingURL=errors.js.map