const nodemailer = require("nodemailer");
// 引入证书文件
const credentials = require("../config/credentials");
// 创建传输方式
const transporter = nodemailer.createTransport({
    service: "qq",
    auth: {
        user: credentials.qq.user,
        pass: credentials.qq.pass,
    }
});
// 注册方法
exports.emailSignUp = function(email, res) {
    // 发送邮件所需的信息
    let options = {
            from: "1449292475@qq.com",
            to: email,
            // 标题
            subject: "感谢您注册信科QQ",
            //文本内弄
            // text
            //html内容
            html: "<span>欢迎您加入信科QQ</span><a href = 'http://www.baidu.com'>点击</a>"
        }
        //发送邮件
    transporter.sendMail(options, function(err, msg) {
        if (err) {
            res.send(err);
        } else {
            res.send("邮箱发送成功");
        }
    })
}