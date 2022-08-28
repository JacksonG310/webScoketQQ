const { getApply, updateFriendState, deleteOrRufuseFriend } = require("../service/friend");
const { getMessage, deleteMessage } = require("../service/message");
const { getUserDetail } = require("../service/user");
exports.getApplyData = async function(req, res) {
    try {
        const { uid } = req.query;
        const { count, applyData } = await getApply(uid);
        for (let i = 0; i < count; i++) {
            const fid = applyData[i].FriendID;
            const { rows: applyMsg } = await getMessage(fid, uid);
            const friendInfo = await getUserDetail(fid);
            applyData[i] = { applyData: applyData[i], applyMsg: applyMsg[0], friendInfo };
        }
        res.send({
            code: 20000,
            msg: "get applyData success",
            applyData,
            count,
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "get applyData error",
            error
        })
    }
}

// 处理好友操作
exports.handleFriendState = async function(req, res) {
        try {
            const { uid, fid, state } = req.body;
            if (uid == fid) throw error;
            const result = await updateFriendState(uid, fid, state);
            res.send({
                code: 20000,
                msg: "update friend state success"
            })
        } catch (error) {
            res.send({
                code: 50000,
                msg: "error",
                error
            });
        }
    }
    // 处理拒绝和删除
exports.handleRefusAndDelete = async function(req, res) {
    try {
        const { uid, fid } = req.body;
        const result = await deleteOrRufuseFriend(uid, fid) && await deleteMessage(uid, fid);
        if (result) {
            res.send({
                code: 20000,
                msg: "handle success"
            })
        } else {
            throw error
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "handle fail",
            error
        })
    }
}