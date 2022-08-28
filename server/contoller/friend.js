const { applyFriend } = require("../service/friend")
    // 处理好友申请
exports.friendApply = async function(req, res) {
    try {
        const { uid, fid, msg } = req.body;
        if (uid == fid) throw err;
        const result = await applyFriend(uid, fid, msg);
        if (result) {
            res.send({
                code: 20000,
                msg: "build frinedApply success"
            })
        } else {
            throw err;
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "error",
            error
        });
    }
}

