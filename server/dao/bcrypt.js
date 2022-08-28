const bcrypt = require("bcryptjs")
    // 加密
exports.encryption = function(e) {
        // 生成随机数salt
        const salt = bcrypt.genSaltSync(10);
        // 生成hash密码
        const hash = bcrypt.hashSync(e, salt);
        return hash
    }
    // 解密
exports.verification = function(e, hash) {
    const verifyRes = bcrypt.compareSync(e, hash);
    return verifyRes;
}