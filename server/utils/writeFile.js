const fs = require('fs');
const multipart = require("multiparty");
exports.writeFile = (file, path) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(file);
        const writeStream = fs.createWriteStream(path);
        readStream.on('data', (data) => {
            writeStream.write(data);
        })
        readStream.on('end', () => {
            writeStream.end();
        })
        writeStream.on('error', (err) => {
            reject(false);
            console.log(err);
        })
        writeStream.on('finish', () => {
            resolve(true);
        })
    })
};
// 插件上传
exports.multipart_upload = function(targetPath, req) {
    let config = {
        maxFieldSize: 200 * 1024 * 1024,
        targetPath
    }
    return new Promise((resolve, reject) => {
        new multipart.Form(config).parse(req, (err, formFields, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                formFields,
                files
            })
        })
    })
}