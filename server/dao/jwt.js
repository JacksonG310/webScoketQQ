const jwt = require("jsonwebtoken");
const secret = "111111";

// 生成token
exports.generateToken = function(id) {
    let payload = { id: id, time: new Date() };
    let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 });
    return token;
}

// 解密token
exports.verifyToken = function(token) {
    let payload = jwt.verify(token, secret, function(err, result) {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
    return payload;
}