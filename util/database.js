const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DEFAULT_DATABASE, null, null, {
  dialect: 'mssql',
  host: process.env.DB_HOST,
  dialectOptions: {
    server: process.env.DB_HOST,
    authentication: {
      type: 'default',
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
    },
    options: {
      instanceName: process.env.DB_INSTANCE,
      useUTC: false,
      dateFirst: 1,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
