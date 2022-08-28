const fs = require('fs');
exports.buildUFolder = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.access(dirPath, function(exist) {
            if (!exist) {
                fs.mkdir(dirPath, function(err) {
                    if (err) {
                        reject(false);
                        console.log(err);
                    } else {
                        resolve(true);
                        console.log("创建成功");
                    }
                })
            } else {
                resolve(true);
                console.log("已经存在");
            }
        })
    })
}

exports.fileExist = (path) => {
    return new Promise((resolve) => {
        fs.access(path, function(err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}