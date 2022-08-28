const db = require("../config/db");
const { STRING, DATE, INTEGER, } = require("sequelize");
// 用户表
const UserSchedule = db.connect.define('user', {
    name: STRING, //用户名
    password: STRING, //密码
    email: STRING, //邮箱
    sex: { //性别
        type: STRING,
        defaultValue: '未知'
    },
    birth: {
        //生日
        type: STRING,
        // defaultValue: '1月1日'
    },
    explain: STRING, //个人签名
    profile: { //头像
        type: STRING,
        defaultValue: 'user.png'
    },

})

// 好友表
const FriendSchedule = db.connect.define('friend', {
        markname: STRING, //昵称
        time: DATE, //好友关系生成时间
        state: INTEGER, //好友关系状态（0：申请中，1：表示申请发送方，对方未同意,2：已通过为好友）
    })
    // 双方ID
FriendSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'UserID'
    }
});
FriendSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'FriendID'
    }
});


//一对一消息表
const MessageSchedule = db.connect.define('message', {
        message: STRING, //消息内容
        types: INTEGER, //消息内容类型(0：文字，1：图片连接，2：音频...)
        time: DATE, // 发送时间
        status: INTEGER, //消息状态(0：已读，1：未读)
    })
    // 发送者ID
MessageSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'sendID'
    }
});
// 接受者ID
MessageSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'receiveID'
    }
});

//群表
const GroupSchedule = db.connect.define('group', {
    name: STRING, //群名
    imgURL: STRING, //群封面时间
    announcement: STRING, //群公告
});
//群主ID
GroupSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'groupOwnerID'
    }
});


//群成员表
const MemberSchedule = db.connect.define('member', {
    imgURL: STRING, //群封面时间
    announcement: STRING, //群公告
    name: STRING, //群内名称
    time: DATE, //加入时间
    tip: { //未读消息数
        type: INTEGER,
        defaultValue: 0
    },
    shield: INTEGER //是否屏蔽群
});
//群ID
MemberSchedule.belongsTo(GroupSchedule, {
    foreignKey: {
        name: 'groupID'
    }
});
// 群成员ID
MemberSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'userID'
    }
});


//群信息表
//一对一消息表
const GroupMessageSchedule = db.connect.define('groupmessage', {
    message: STRING, //消息内容
    types: INTEGER, //消息内容类型(0：文字，1：图片连接，2：音频...)
    time: DATE, // 发送时间
});
// 发送者ID
GroupMessageSchedule.belongsTo(UserSchedule, {
    foreignKey: {
        name: 'sendID'
    }
});
// 群ID
GroupMessageSchedule.belongsTo(GroupSchedule, {
    foreignKey: {
        name: 'groupID'
    }
});
module.exports = {
    UserSchedule,
    FriendSchedule,
    MessageSchedule,
    GroupSchedule,
    MemberSchedule,
    GroupMessageSchedule
}