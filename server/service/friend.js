const { Op } = require("sequelize");
const { FriendSchedule: Friend, UserSchedule, MessageSchedule } = require("../model/Model");
const { addMessage, updateMessage } = require("../service/message");
// 搜索页面
//判断好友关系
exports.isFriend = async function(uid, fid) {
    try {
        const result = await Friend.findOne({
            where: {
                FriendID: fid,
                UserID: uid,
                state: "2",
            }
        })
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {

    }
}


// 添加好友页面
// 创建请求
const buildApply = async function($1, $2, state) {
    try {
        let data = {
            UserID: $1,
            FriendID: $2,
            state,
            time: new Date(),
        }
        await Friend.create(data);
        return true;
    } catch (error) {
        return false
    }
}

// 好友申请
exports.applyFriend = async function(uid, fid, message) {
    // 判断是否已经申请过
    try {
        let { count } = await Friend.findAndCountAll({
            where: {
                UserID: uid,
                FriendID: fid
            }
        })
        if (count <= 0) {
            await buildApply(uid, fid, 1); //发送人，申请中,
            await buildApply(fid, uid, 0); //接收人，申请中
            await addMessage(uid, fid, message, 0, 0);
        } else {
            await updateMessage(uid, fid, message, 0);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

// 获取好友申请数据
exports.getApply = async function(uid) {
    try {
        const { count, rows: applyData } = await Friend.findAndCountAll({
            where: {
                UserID: uid,
                state: 0,
            }
        })
        return {
            count,
            applyData
        };
    } catch (error) {
        throw error;
    }
};
// 更新好友状态
exports.updateFriendState = async function($1, $2, state) {
    try {
        await Friend.update({ state }, {
            where: {
                [Op.or]: [
                    { UserID: $1, FriendID: $2 },
                    { UserID: $2, FriendID: $1 }
                ]
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}

// 拒绝或删除好友
exports.deleteOrRufuseFriend = async function($1, $2) {
    try {
        await Friend.destroy({
            where: {
                [Op.or]: [
                    { UserID: $1, FriendID: $2 },
                    { UserID: $2, FriendID: $1 }
                ]
            },
        })
        return true;
    } catch (error) {
        throw error;
    }
};
// 获取好友列表
exports.getFriendList = async function(uid) {
    try {
        const { rows, count } = await Friend.findAndCountAll({
            attributes: ["FriendID"],
            where: {
                UserID: uid,
                state: 2
            },
            include: [{
                attributes: ["name", "profile"],
                model: UserSchedule,
            }]
        })
        return { rows, count };
    } catch (error) {
        throw error;
    }
}