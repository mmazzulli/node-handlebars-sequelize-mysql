// const Sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mmazzulli', 'root', '12345',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})

// Exportar conexão
// As duas "const" -> "S" maiúsculo e "s" minúsculo
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}