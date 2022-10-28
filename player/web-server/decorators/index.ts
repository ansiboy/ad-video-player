import { createParameterDecorator } from "maishu-node-mvc";
import { parseMultipart } from "./form-parse";
import { FormPart } from "./form-parse";

export let files = createParameterDecorator<FormPart[]>(async (context) => {

    let request = context.req;
    let contentType = request.headers['content-type'] as string;
    let formParts = new Promise<FormPart[]>((reslove, reject) => {
        var buffers: Buffer[] = [];
        request.on('data', buffer => {
            console.assert(Buffer.isBuffer(buffer));
            buffers.push(buffer);

        }).on('end', () => {
            try {
                let buffer = Buffer.concat(buffers);
                let obj: FormPart[] = [];
                if (contentType.indexOf('multipart/form-data') >= 0) {
                    obj = parseMultipart(buffer, contentType);
                }
                reslove(obj);
            }
            catch (err) {
                reject(err);
            }
        })

    });

    return formParts;
})