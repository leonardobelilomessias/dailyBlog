// Iniciando banco de dados
const sequelize = require("sequelize");
const connection = new sequelize('guiapress','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;