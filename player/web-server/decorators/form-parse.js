"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = exports.parseMultipart = void 0;
const errors_1 = __importDefault(require("../controllers/errors"));
function parseMultipart(buffer, contentType) {
    if (!buffer)
        throw errors_1.default.argumentNull("buffer");
    if (!contentType)
        throw errors_1.default.argumentNull("contentType");
    let c = parseContentType(contentType);
    let boundary = c.boundary;
    if (!boundary)
        throw errors_1.default.notFindBoundaryInContentType(contentType); //new Error(`Content type ${contentType} is incorrect.`);
    let reader = new BufferReader(buffer);
    let line = reader.readLine("buffer");
    let currentFormPart = null;
    let contentLines = null;
    let formParts = [];
    while (line != null) {
        let lineText = line.toString("utf-8").trim();
        if (lineText == `--${boundary}` || lineText == `--${boundary}--`) {
            if (currentFormPart == null) {
                currentFormPart = {};
            }
            else {
                if (contentLines == null)
                    throw new Error("Parse content fail.");
                let lastLine = contentLines[contentLines.length - 1];
                //==============================================================================
                // 去除最后一行的换行符
                contentLines[contentLines.length - 1] = trim(lastLine);
                //==============================================================================
                currentFormPart.content = Buffer.concat(contentLines);
                if (!currentFormPart["Content-Type"]) {
                    currentFormPart.content = currentFormPart.content.toString("utf-8");
                }
                formParts.push(currentFormPart);
                currentFormPart = {};
                contentLines = null;
            }
        }
        else if (lineText != "" && currentFormPart != null && contentLines == null) {
            let keyValues = lineText.split(";").map(o => o.trim());
            for (let i = 0; i < keyValues.length; i++) {
                let item = keyValues[i];
                if (i == 0) {
                    let arr = item.split(":").map(o => o.trim());
                    currentFormPart[arr[0]] = arr[1];
                }
                else {
                    let index = item.indexOf("=");
                    console.assert(index > 0, 'String is not contains \'=\' signal.');
                    let name = item.substr(0, index);
                    let value = item.substr(index + 1);
                    currentFormPart[name] = JSON.parse(value);
                    // let arr = item.split("=", 2).map(o => o.trim());
                    // currentFormPart[arr[0]] = JSON.parse(arr[1]);
                }
            }
        }
        else if (lineText == "" && currentFormPart != null && contentLines == null) {
            contentLines = [];
        }
        else if (contentLines != null) {
            contentLines.push(line);
        }
        line = reader.readLine("buffer");
    }
    return formParts;
    // let r: MultipartResult = {};
    // for (let i = 0; i < formParts.length; i++) {
    //     let name = formParts[i].name;
    //     if (r[name]) {
    //         let value = r[name];
    //         if (Array.isArray(value)) {
    //             value.push(formParts[i].content);
    //         }
    //         else {
    //             r[name] = [value, formParts[i].content];
    //         }
    //     }
    //     else {
    //         r[name] = formParts[i].content;
    //     }
    // }
    // return r;
}
exports.parseMultipart = parseMultipart;
function parseContentType(contentType) {
    let r = {};
    contentType.split(";").map(o => o.trim())
        .forEach((o, i) => {
        if (i == 0) {
            r.contentType = o;
        }
        else {
            let arr = o.split('=').map(o => o.trim());
            r[arr[0]] = arr[1];
        }
    });
    return r;
}
const rchar = Buffer.from('\r')[0];
const nchar = Buffer.from('\n')[0];
function trim(line) {
    let latest = line[line.length - 1];
    let secondToLatest = line.length >= 2 ? line[line.length - 2] : null;
    if (latest == nchar && secondToLatest == rchar) {
        return line.slice(0, line.length - 2);
    }
    else if (latest == nchar || latest == rchar) {
        return line.slice(0, line.length - 1);
    }
    return line;
}
exports.trim = trim;
class BufferReader {
    buffer;
    position;
    constructor(buffer) {
        if (!buffer)
            throw errors_1.default.argumentNull("buffer");
        this.buffer = buffer;
        this.position = 0;
    }
    reset() {
        this.position = 0;
    }
    readLine(resultType) {
        if (this.position > this.buffer.length - 1) {
            return null;
        }
        resultType = resultType || "string";
        let line = [];
        while (this.position < this.buffer.length) {
            line.push(this.buffer[this.position]);
            this.position = this.position + 1;
            if (line[line.length - 1] == nchar) {
                break;
            }
        }
        let lineBuffer = Buffer.from(line);
        if (resultType == "buffer") {
            return lineBuffer;
        }
        let lineText = lineBuffer.toString("utf-8");
        return lineText;
    }
}
//# sourceMappingURL=form-parse.js.map