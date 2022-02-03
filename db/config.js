const {config} = require('../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD= encodeURIComponent(config.dbPassword)
let URI =  `${config.dbType}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

if(config.isProd) {
  URI = config.dbUrl
}

module.exports = {
  development: {
    url: URI,
    dialect: config.dbType,
  },
  production: {
    url: URI,
    dialect: config.dbType,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
