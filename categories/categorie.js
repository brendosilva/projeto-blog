const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Category = connection.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    slug:   {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

//Category.sync({force: true})

module.exports = Category;