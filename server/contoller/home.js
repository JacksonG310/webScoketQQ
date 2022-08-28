const { getFriendList } = require("../service/friend");
const { getLatestMsg, countUnreadMessage } = require("../service/message");

exports.getFriend = async function(req, res) {
    try {
        const { uid } = req.query;
        const { rows: friendList, count } = await getFriendList(uid);
        for (let i = 0; i < count; i++) {
            const fid = friendList[i].FriendID;
            const latestMsg = await getLatestMsg(fid, uid);
            const unReadNum = await countUnreadMessage(fid, uid);
            friendList[i].dataValues.user.dataValues.latestMsg = latestMsg;
            friendList[i].dataValues.unReadNum = unReadNum;
        }
        res.send({
            code: 20000,
            friendList,
            count,
        })
    } catch (error) {
        res.send({
            code: 50000,
            error
        })
    }

}