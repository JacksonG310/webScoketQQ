const { filesURL } = require("./constant");
const { fileExist } = require("./buildUserfolder");
const fs = require("fs");
module.exports = (HASH, count) => {
    return new Promise(async(resolve, reject) => {
        const path = `${filesURL}/${HASH}`;
        let fileList = [];
        let suffix;
        // 判断文件夹是否存在
        const isExist = await fileExist(path);
        if (!isExist) {
            reject("HASH path is not found");
            return;
        }
        fileList = fs.readdirSync(path);
        if (fileList.length < count) {
            reject("the slice has not been uploaded");
            return;
        }
        if (await isExist())
            fileList.sort((a, b) => {
                let reg = /_(\d+)/;
                return reg.exec(a)[1] - reg.exec(b)[1];
            }).forEach(item => {
                !suffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1] : null;
                fs.appendFileSync(`${filesURL}/${HASH}.${suffix}`, fs.readFileSync(`${path}/${item}`));
                fs.unlinkSync(`${path}/${item}`);
            });
        fs.rmdirSync(path);
        resolve({
            path: `${filesURL}/${HASH}.${suffix}`,
            filename: `${HASH}.${suffix}`
        })
    })
}