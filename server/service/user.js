const bcrypt = require("../dao/bcrypt");
const jwt = require("../dao/jwt");
const { UserSchedule: User } = require("../model/Model");
const { Op } = require("sequelize");
// 注册页面
exports.buildUser = async function(username, email, profile, password, res) {
    //密码加密
    const passwordHash = bcrypt.encryption(password);
    try {
        const data = {
            name: username,
            password: passwordHash,
            email: email,
            profile: profile,
        }
        await User.create(data);
        return true;
    } catch (error) {
        return false;
    }
}

//匹配用户表元素个数
exports.countUsername = async function(data, type, res) {
    let target;
    if (type) {
        target = { email: data };
    } else {
        target = { name: data };
    }
    try {
        const userList = await User.findAll({
            where: target
        })
        return userList;
    } catch (error) {

    }
}

// 登录页面
//用户登录验证
exports.verifyUserInfo = async function(data, password, res) {
    try {
        const userInfo = await User.findOne({
            where: {
                [Op.or]: [
                    { name: data },
                    { email: data }
                ],
            }
        })
        if (userInfo.length == 0 || userInfo == null) {
            res.send({
                code: 50000,
                msg: "user not found"
            })
        } else {
            if (bcrypt.verification(password, userInfo.password)) {
                //验证hash密码
                //使用id生成token
                const token = jwt.generateToken(userInfo.id);
                res.send({
                    code: 20000,
                    msg: "vervify successfully",
                    data: {
                        username: userInfo.name,
                        id: userInfo.id,
                        profile: userInfo.profile,
                        token
                    }
                })
                return true;
            } else {
                res.send({
                    code: 40000,
                    msg: "password wrong",
                })
            }
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "find user error"
        })
    };
}

// 详情页面
//用户详情
exports.getUserDetail = async function(id) {
    try {
        const userInfo = await User.findOne({
            where: {
                id,
            }
        })
        return userInfo
    } catch (error) {
        throw error
    }
};
// 更新用户信息
exports.updateUserInfo = async function(id, type, data) {
    try {
        await User.update({
            [type]: data
        }, {
            where: {
                id
            }
        })
        return true;
    } catch (error) {
        return false;
    }
};
// 搜索页面
//搜索用户
exports.searchUserItem = async function(keyword) {
        try {
            const user = await User.findAll({
                attributes: ["name", "id", "email", "profile"],
                where: {
                    // name: keyword,
                    [Op.or]: [{
                            name: {
                                [Op.like]: '%' + keyword + '%'
                            }
                        },
                        {
                            email: {
                                [Op.like]: '%' + keyword + '%'
                            }
                        }
                    ]
                },
            })
            return user;
        } catch (error) {
            return false;
        }
    }
    // 更新密码
exports.updatePasswordItem = async function(id, password) {
    try {
        const passwordHash = bcrypt.encryption(password);
        await User.update({
            password: passwordHash
        }, {
            where: {
                id
            }
        })
        return true;
    } catch (error) {
        return false;
    }
};

exports.getBothInfo = async function(uid, fid) {
    try {
        const info = await User.findAll({
            attributes: ["id", "profile", "name"],
            where: {
                [Op.or]: [
                    { id: uid }, { id: fid }
                ]
            }
        })
        return info;
    } catch (error) {
        throw error
    }
}