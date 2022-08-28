const { updateUserInfo, updatePasswordItem } = require("../service/user");
// 更新性别
exports.updateSex = async function(req, res) {
    try {
        const { id, sex } = req.body;
        await updateUserInfo(id, 'sex', sex);
        res.send({
            code: 20000,
            msg: "update 'sex' success",
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "update 'sex' error",
            error
        })
    }
};
// 更新签名
exports.updateSign = async function(req, res) {
    try {
        const { id, sign } = req.body;
        await updateUserInfo(id, 'explain', sign);
        res.send({
            code: 20000,
            msg: "update 'explain' success",
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "update 'explain' error",
            error
        })
    }
};
// 更新生日
exports.updateBirth = async function(req, res) {
    try {
        const { id, birth } = req.body;
        await updateUserInfo(id, 'birth', birth, res);
        res.send({
            code: 20000,
            msg: "update 'birth' success",
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "update 'birth' error",
            error
        })
    }
}

// 更新密码
exports.updatePassword = async function(req, res) {
    try {
        const { id, password } = req.body;
        await updatePasswordItem(id, password);
        res.send({
            code: 20000,
            msg: "update 'password' success",
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "update 'password' error",
            error
        })
    }
}