const { verifyUserInfo, updateUserInfo } = require("../service/user");
const { buildUserFolder } = require("../utils/buildUserfolder");
const { writeFile } = require("../utils/writeFile");
const path = require('path');
// 用户登录
exports.login = async function(req, res) {
    const { data, password } = req.body.loginForm;
    await verifyUserInfo(data, password, res);

}