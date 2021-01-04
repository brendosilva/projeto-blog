const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/categorie');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    slug:   {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

// Relacionamento 1-p-N
Category.hasMany(Article);
//relacionamento. 1-p-1
Article.belongsTo(Category);

//Sicronizando relacionamentos na base de dados

//Article.sync({force: true});

module.exports = Article;