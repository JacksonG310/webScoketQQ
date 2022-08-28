const { Op } = require("sequelize");
const { MessageSchedule: Message } = require("../model/Model");

// 添加消息
exports.addMessage = async function(sid, rid, message, status, type) {
    try {
        let data = {
            sendID: sid,
            receiveID: rid,
            message: message,
            types: type,
            time: new Date(),
            status,
        }
        await Message.create(data);
        // 添加成功
        return true;
    } catch (error) {
        // 添加失败
        throw error;
    }
};
// 更新消息
exports.updateMessage = async function(sid, rid, msg, state) {
    try {
        await Message.update({ message: msg, state }, {
            where: {
                sendID: sid,
                receiveID: rid,
            }
        });
        // 添加成功
        return true;
    } catch (error) {
        // 添加失败
        throw error;
    }
}

// 获取信息
exports.getMessage = async function(sid, rid) {
    try {
        const { count, rows } = await Message.findAndCountAll({
            where: {
                sendID: sid,
                receiveID: rid,
            }
        })
        return {
            rows,
            count
        }
    } catch (error) {
        throw error;
    }
}


// 删除信息
exports.deleteMessage = async function($1, $2) {
    try {
        await Message.destroy({
            where: {
                [Op.or]: [{
                    sendID: $1,
                    receiveID: $2,
                }, {
                    sendID: $2,
                    receiveID: $1,
                }]
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}

// 获取最后一条消息
exports.getLatestMsg = async function($1, $2) {
    try {
        const latestMsg = await Message.findAll({
            attributes: ['id', 'sendID', "types", 'receiveID', 'message', 'updatedAt'],
            where: {
                [Op.or]: [{
                    sendID: $1,
                    receiveID: $2
                }, {
                    sendID: $2,
                    receiveID: $1
                }]
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 1,
        })
        return latestMsg[0];
    } catch (error) {
        throw error;
    }
};
// 获取未读消息数
exports.countUnreadMessage = async function($1, $2) {
    try {
        const { count } = await Message.findAndCountAll({
            where: {
                status: 0,
                sendID: $1,
                receiveID: $2
            }
        })
        return count;
    } catch (error) {
        throw error;
    }
}

// 获取聊天记录
exports.getChatMessage = async function($1, $2, pageIndex) {
    try {
        const { count, rows } = await Message.findAndCountAll({
            attributes: ["id", "types", "sendID", "receiveID", "message", "createdAt"],
            where: {
                [Op.or]: [
                    { sendID: $1, receiveID: $2 },
                    { sendID: $2, receiveID: $1 }
                ]
            },
            order: [
                ['time', 'DESC']
            ],
            limit: 15,
            offset: (pageIndex - 1) * 15
        })
        return {
            count,
            rows
        }
    } catch (error) {
        throw error
    }
}

exports.updateStatus = async function(sid, rid) {
    try {
        await Message.update({ status: 1 }, {
            where: {
                sendID: sid,
                receiveID: rid,
            }
        })
    } catch (error) {
        throw error;
    }
}