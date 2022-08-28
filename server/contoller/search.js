const { searchGroup, isGruopMember } = require("../service/search");
const { searchUserItem } = require("../service/user");
const { isFriend } = require("../service/friend");
//搜索用户
exports.searchUser = async function(req, res) {
    try {
        const keyword = req.query.keyword;
        const user = await searchUserItem(keyword, res);
        res.send({
            code: 20000,
            msg: "search user success",
            data: user
        });
    } catch (error) {
        res.send({
            code: 50000,
            msg: "search user error",
            error
        });
    }
}

//判断是否为好友
exports.isFriend = async function(req, res) {
    try {
        const uid = req.query.uid;
        const fid = req.query.fid;
        const result = await isFriend(uid, fid, res);
        if (result) {
            res.send({
                code: 20000,
                msg: "is Friend",
                data: true,
            });
        } else {
            res.send({
                code: 40000,
                msg: "not Friend",
                data: false,

            });
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "error",
            error
        });
    }
}

//搜索群
exports.searchGroup = function(req, res) {
    const keyword = req.query.keyword;
    searchGroup(keyword, res);
}

//判断是否在群内
exports.isGruopMember = function(req, res) {
    const uid = req.query.uid;
    const gid = req.query.gid;
    isGruopMember(uid, gid, res);
}