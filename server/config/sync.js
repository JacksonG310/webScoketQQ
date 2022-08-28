const db = require("./db");
const Model = require("../model/Model")
db.connect.sync().then(() => {
    // process.exit();
})