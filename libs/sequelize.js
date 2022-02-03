const { Sequelize } = require('sequelize');

const { config } = require('../config/config')
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD= encodeURIComponent(config.dbPassword)
let URI =  `${config.dbType}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

if (config.isProd) {
  URI = config.dbUrl
}

const options = {
  dialect: config.db,
  logging: config.isProd ? false : console.log,
}

if (config.isProd && config.dbType === 'postgres') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
