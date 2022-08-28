const { Sequelize } = require("sequelize");
const db = {}
const connect = new Sequelize('chart', 'root', '111111', {
    dialect: "mysql",
    host: "localhost",
})
db.connect = connect

connect.authenticate().then(() => {
    console.log('Connect has been established successfully');
}, (error) => {
    console.error('Unable to connect to the database:', error);
});

module.exports = db;