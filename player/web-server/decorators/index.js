"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.files = void 0;
const maishu_node_mvc_1 = require("maishu-node-mvc");
const form_parse_1 = require("./form-parse");
exports.files = (0, maishu_node_mvc_1.createParameterDecorator)(async (context) => {
    let request = context.req;
    let contentType = request.headers['content-type'];
    let formParts = new Promise((reslove, reject) => {
        var buffers = [];
        request.on('data', buffer => {
            console.assert(Buffer.isBuffer(buffer));
            buffers.push(buffer);
        }).on('end', () => {
            try {
                let buffer = Buffer.concat(buffers);
                let obj = [];
                if (contentType.indexOf('multipart/form-data') >= 0) {
                    obj = (0, form_parse_1.parseMultipart)(buffer, contentType);
                }
                reslove(obj);
            }
            catch (err) {
                reject(err);
            }
        });
    });
    return formParts;
});
//# sourceMappingURL=index.js.map