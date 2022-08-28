const { Op } = require("sequelize");
const { UserSchedule: User, FriendSchedule: Friend, GroupSchedule: Group, MemberSchedule: Member } = require("../model/Model");

//搜索群

exports.searchGroup = async function(keyword, res) {
    try {
        const group = await Group.findAll({
            attributes: ["name", "imageURL"],
            where: {
                name: {
                    [Op.like]: '%' + keyword + '%'
                }
            }
        })
        res.send({
            code: 20000,
            msg: "search group success",
            data: group
        });
    } catch (error) {
        res.send({
            code: 50000,
            msg: "search group error",
        });
    }
}

//判断是否在群内
exports.isGroupMember = async function(uid, gid) {
    try {
        const result = await Member.findOne({
            where: {
                "userID": uid,
                "groudID": gid,
            }
        })
        if (result) {
            res.send({
                code: 20000,
                msg: "is group Member",
                data: true
            });
        } else {
            res.send({
                code: 40000,
                msg: "not group Member",
                data: false
            });
        }
    } catch (error) {
        res.send({
            code: 50000,
            msg: "error",
        });
    }
}