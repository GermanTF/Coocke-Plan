const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME1, process.env.DB_USER1, process.env.DB_PASSWORD1, {
    host: process.env.DB_HOST1,
    dialect: 'mysql',
});

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


module.exports = sequelize;