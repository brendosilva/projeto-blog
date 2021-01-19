const Sequelize = require('sequelize');

const db = 'blogguiando';
const user = 'brendosilva';
const password = '951753br';

const connection = new Sequelize(db, user, password, {
    host: 'mysql742.umbler.com',
    dialect: 'mysql',
    timezone: "-03:00",
});

module.exports = connection;