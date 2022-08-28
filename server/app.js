const express = require("express");
const db = require("./config/db");
const sync = require("./config/sync");
const bodyParser = require("body-parser");
const router = require("./router/index");
const app = new express();
const path = require('path');
require("./scoket")(app);

// 跨域中间件
app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})




app.use('/', express.static(path.join(__dirname, "/public")));



//解析body数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

router(app);

//判断token
// app.use(function(req,res,next){
//     let token = req.header.token;
//     if(token){

//     }else{
//         next();
//     }
// })

// 处理404
app.use(function(request, response, next) {
    let err = new Error("404 Not Found");
    err.status = 404;
    next(err);
})

// 出现错误的处理
app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    response.send(err.message);
})





app.listen(3000, () => {
    console.log("server is running at port 3000...");
})