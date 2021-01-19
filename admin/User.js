const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('users', {
    email: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

//User.sync({force: true})

module.exports = User;