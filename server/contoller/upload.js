const { writeFile, multipart_upload } = require("../utils/writeFile");
const { userURL, filesURL } = require("../utils/constant");
const { fileExist } = require("../utils/buildUserfolder");
const { updateUserInfo } = require("../service/user");
const mergeChunk = require("../utils/mergeChunk");
const path = require('path');
const fs = require("fs");
exports.uploadProfile = async function(req, res) {
    try {
        const { formFields, files } = await multipart_upload(userURL, req);
        const file = (files.file && files.file[0]) || {};
        const filename = formFields.filename[0];
        const username = formFields.username[0];
        const id = formFields.id[0];
        const targetPath = path.resolve(userURL, username, filename);
        const isExist = await fileExist(targetPath);
        const dbPath = `http://127.0.0.1:3000/users/${username}/${filename}`;
        if (!isExist) {
            writeFile(file.path, targetPath);
            await updateUserInfo(id, 'profile', dbPath, res);
        }
        res.send({
            code: 20000,
            msg: "upload success",
            path: dbPath
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "upload fail",
            error
        })
    }
}

exports.uploadSignFile = async function(req, res) {
    try {
        // formFields是formData的信息，files是文件
        const { formFields, files } = await multipart_upload(filesURL, req);
        const file = (files.file && files.file[0]) || {};
        const filename = formFields.filename[0];
        const targetPath = path.resolve(filesURL, filename);
        const dbPath = `http://127.0.0.1:3000/files/${filename}`;
        const isExist = await fileExist(targetPath);
        if (isExist) {
            console.log("已经存在");
        } else {
            writeFile(file.path, targetPath);
        }
        res.send({
            code: 20000,
            msg: "upload success",
            dbPath
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "upload fail",
            error
        })
    }
}

exports.uploadChunk = async function(req, res) {
    try {
        // formFields是formData的信息，files是文件
        const { formFields, files } = await multipart_upload(filesURL, req);
        const file = (files.file && files.file[0]) || {};
        const filename = formFields.filename[0];
        const [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
        const path = `${filesURL}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        const targetPath = `${filesURL}/${HASH}/${filename}`;
        const isExist = await fileExist(targetPath);
        if (isExist) {
            res.send({
                code: 20000,
                msg: "file is already exists",
                dpPath: `http://127.0.0.1:3000/files/${HASH}/${filename}`,
            })
        } else {
            writeFile(file.path, targetPath).then(() => {
                res.send({
                    code: 20000,
                    msg: "write file success",
                    dpPath: `http://127.0.0.1:3000/files/${HASH}/${filename}`,
                })
            });
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "file upload failed",
            error
        })
    }
}

exports.mergeChunk = async function(req, res) {
    const { HASH, count } = req.body;
    try {
        const { path, filename } = await mergeChunk(HASH, count);
        res.send({
            code: 20000,
            msg: "merge chunk success",
            filename: filename,
            dbPath: `http://127.0.0.1:3000/files/${filename}`
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "merge file fail",
            error
        })
    }
}

exports.alreadyExist = async function(req, res) {
    let { HASH } = req.query;
    let path = `${filesURL}/${HASH}`
    let fileList = [];
    try {
        fileList = fs.readFileSync(path);
        fileList = fileList.sort((a, b) => {
            let reg = /_(\d+)/;
            return reg.exec(a)[1] - req.exec(b)[1];
        })
        res.send({
            code: 20000,
            msg: "some chunks are exist",
            fileList
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "error",
            error
        })
    }
}