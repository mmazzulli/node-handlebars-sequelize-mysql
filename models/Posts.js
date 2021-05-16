const conexao = require('./conexao');
const { DataTypes } = require('sequelize');
// a conexao acaba sendo um SUPER OBJETO e o sequelize uma CLASSE instanciada do Sequelize(maiúsculo). 
const Posts = conexao.sequelize.define('posts', {
  // titulo: conexao.Sequelize.STRING,
  // conteudo: conexao.Sequelize.TEXT
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  }
});

module.exports = Posts