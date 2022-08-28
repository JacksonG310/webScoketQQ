const { emailSignUp } = require("../dao/emailServer");
const { signUp, judgeUsername } = require("../contoller/signUp");
const { login } = require("../contoller/login");
const { searchUser, isFriend, searchGroup, isGruopMember } = require("../contoller/search");
const { userDetail } = require("../contoller/userDetail");
const { friendApply } = require("../contoller/friend");
const { updateSex, updateSign, updateBirth, updatePassword } = require("../contoller/individual");
const { uploadProfile, uploadSignFile, uploadChunk, mergeChunk } = require("../contoller/upload");
const { getApplyData, handleFriendState, handleRefusAndDelete } = require("../contoller/apply");
const { getFriend } = require("../contoller/home");
const { getBothSizeInfo, getChatMessage, addMessage, changeStatus } = require("../contoller/chat");
const { download } = require("../contoller/download");

module.exports = function(app) {
    app.get('/test', (request, response) => {
        response.send("test")
    });
    // 连接邮箱
    app.post('/mail', (request, response) => {
        const email = request.body.email;
        emailSignUp(email, response);
    });
    //注册页面
    //注册
    app.post("/signup/add", (request, response) => {
        signUp(request, response);
    });
    //判断是否占用
    app.post("/signup/judge", (request, response) => {
        judgeUsername(request, response);
    })

    //登录页面
    app.post("/login", (request, response) => {
        login(request, response);
    })


    //搜索页面
    // 搜索用户
    app.get("/search/user", (request, response) => {
        searchUser(request, response);
    });
    //判断是否为好友
    app.get("/search/isfriend", (request, response) => {
        isFriend(request, response);
    });
    // 搜索群
    app.get("/search/group", (request, response) => {
        searchGroup(request, response);
    });
    //是否在群内
    app.get("search/isgroupmember", (request, response) => {
        isGruopMember(request, response);
    })


    //好友主页与用户详情页
    app.get("/userDetail", (request, response) => {
        userDetail(request, response);
    })

    // 好友申请
    app.post("/friend/friendApply", (request, response) => {
        friendApply(request, response);
    })

    // 个人详情页
    app.put("/individual/updateSex", (request, response) => {
        updateSex(request, response);
    })
    app.put("/individual/updateSign", (request, response) => {
        updateSign(request, response);
    })
    app.put("/individual/updateBirth", (request, response) => {
        updateBirth(request, response);
    })

    // 上传头像
    app.post("/upload", (request, response) => {
        uploadProfile(request, response);
    })
    app.put("/updatePassword", (request, response) => {
        updatePassword(request, response);
    })

    // 好友申请页
    app.get("/apply/getApplyData", (request, response) => {
        getApplyData(request, response);
    })
    app.post("/apply/updateFriendState", (request, response) => {
        handleFriendState(request, response);
    })
    app.post("/apply/refuseOrDelete", (request, response) => {
        handleRefusAndDelete(request, response);
    })


    // 主页
    app.get("/home/getFriendList", (request, response) => {
        getFriend(request, response);
    })


    // 聊天页
    app.get("/chat/getBothInfo", (request, response) => {
        getBothSizeInfo(request, response);
    })
    app.get("/chat/getChatMessage", (request, response) => {
        getChatMessage(request, response);
    })
    app.put("/chat/changeStatus", (request, response) => {
        changeStatus(request, response);
    })
    app.post("/chat/addMessage", (request, response) => {
        addMessage(request, response);
    })
    app.post("/chat/uploadFile", (request, response) => {
        uploadSignFile(request, response);
    })
    app.post("/chat/uploadChunk", (request, response) => {
        uploadChunk(request, response);
    })
    app.post("/chat/mergeChunk", (request, response) => {
        mergeChunk(request, response);
    })
    app.post("/chat/download", (request, response) => {
        download(request, response);
    })
}