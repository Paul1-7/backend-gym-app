const { Sequelize } = require('sequelize')
const config = require('./../config/config.js')
const setupModels = require('./../db/models/index.js')

const options = {
  dialect: 'postgres',
  logging: true
}

if (config.ISPROD) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.DBURL, options)

setupModels(sequelize)

// sequelize.sync({ force: true })
module.exports = sequelize
