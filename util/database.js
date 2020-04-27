const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DEFAULT_DATABASE || 'GRUAS',
  process.env.DB_USER || 'gruas',
  process.env.DB_PASSWORD || 'Gruas18',
  {
    host: process.env.DB_HOST || 'DESKTOP-RRJ20MQ',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
        useUTC: false,
        dateFirst: 1,
      },
    },
  }
);

module.exports = sequelize;
