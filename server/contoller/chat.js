const { getBothInfo } = require("../service/user");
const { getChatMessage, updateStatus } = require("../service/message");
// 获取双方信息
exports.getBothSizeInfo = async function(req, res) {
    try {
        const { uid, fid } = req.query;
        const info = await getBothInfo(uid, fid);
        let senderInfo, receiverInfo;
        info.forEach((item) => {
            if (item.id == uid) {
                senderInfo = item;
            } else if (item.id == fid) {
                receiverInfo = item;
            } else {
                throw error;
            }
        })
        res.send({
            code: 20000,
            msg: "get both info success",
            senderInfo,
            receiverInfo
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "get both info error",
            error
        })
    }
}

// 获取聊天记录
exports.getChatMessage = async function(req, res) {
    try {
        const { uid, fid, pageIndex } = req.query;
        const { count, rows: messages } = await getChatMessage(uid, fid, pageIndex);
        res.send({
            code: 20000,
            msg: "get chat message success",
            count,
            messages,
        })
    } catch (error) {
        res.send({
            code: 50000,
            msg: "get chat message error",
            error,
        })
    }
}

exports.changeStatus = async function(req, res) {
    try {
        const { uid, fid } = req.body;
        await updateStatus(fid, uid);
    } catch (error) {
        console.log(error);
    }
};