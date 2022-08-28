const { buildUser, countUsername } = require("../service/user");
const { buildFolder } = require("../utils/buildUserfolder");
const { writeFile } = require("../utils/writeFile");
const path = require("path");
// 判断是否是用户或邮箱是否占用
exports.judgeUsername = async function(req, res) {
    try {
        const data = req.body.data;
        //0：用户名，1：邮箱
        const type = req.body.type;
        const userList = await countUsername(data, type);
        if (userList.length > 0) {
            res.send({
                code: 20000,
                msg: "match data success",
                used: true

            })
        } else {
            res.send({
                code: 20000,
                msg: "data not be occupy",
                used: false
            })
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "match data success",
            used: fasle
        })
    }
}

// 用户注册
exports.signUp = async function(req, res) {
    try {
        const { username, email, password } = req.body.signUpForm;
        const profile = `http://127.0.0.1:3000/users/user.png`;
        const result = await buildUser(username, email, profile, password);
        if (result) {
            // 个人文件夹名称
            const folderName = username;
            // 文件夹路径
            const dirPath = path.resolve(__dirname, '../public/users', folderName);
            await buildFolder(dirPath);
        }
        res.send({
            code: 20000,
            msg: "build user success",
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "build user error",
            error
        })
    }
}