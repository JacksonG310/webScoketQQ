const { createServer } = require("http");
const { Server } = require("socket.io");
const { addMessage } = require("./service/message");

const onlineUsers = {};

module.exports = function(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, { cors: true });
    io.on("connection", (socket) => {
        bindEvent(socket);
    });
    // 在线的用户id

    const bindEvent = function(socket) {
        // 用户登录事件
        socket.on("join", (uid) => {
            socket.emit('msg', uid);
            // 建立用户id与socket分配id的映射
            socket.uid = uid;
            onlineUsers[uid] = socket.id;
            console.log(onlineUsers);
        });
        // 发送消息
        socket.on("sendMessage", async function(msg) {
            const { receiveID, sendID, message, types, status } = msg;
            console.log(onlineUsers[sendID]);
            socket.to(onlineUsers[sendID]).emit('receiveMessage', msg);
            socket.to(onlineUsers[receiveID]).emit('receiveMessage', msg);
            await addMessage(sendID, receiveID, message, status, types);
        });
        // 用户断开事件
        socket.on("disconnecting", () => {
            if (onlineUsers.hasOwnProperty(socket.uid)) {
                delete onlineUsers[socket.id];
                console.log(socket.id + '离开了');
            }
        });
        // 判断用户是否在房间内
        socket.on("isInRoom", (uid) => {
            const isInRoom = onlineUsers.hasOwnProperty(uid);
            socket.emit("notInRoom", {
                isInRoom,
                uid
            })
        })
    }
    httpServer.listen(5000, () => {
        console.log("socket listening in 5000");
    });
}