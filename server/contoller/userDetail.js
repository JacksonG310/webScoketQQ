const { getUserDetail } = require("../service/user");

exports.userDetail = async function(req, res) {
    try {
        const id = req.query.id;
        const userInfo = await getUserDetail(id);
        res.send({
            code: 20000,
            msg: "find user success",
            data: userInfo
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "not find the user",
            error
        })
    }
}