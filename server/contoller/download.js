const { filesURL } = require("../utils/constant");
exports.download = function(req, res) {
    const filename = req.body.filename;
    // 下载的地址
    const filePath = `${filesURL}/${filename}`
    console.log(filePath);
    res.download(filePath, filename);
}