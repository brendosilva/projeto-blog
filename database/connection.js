const Sequelize = require('sequelize');

const db = 'blogguiando';
const user = 'root';
const password = '';

const connection = new Sequelize(db, user, password, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00",
});

module.exports = connection;
