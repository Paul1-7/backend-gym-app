require('dotenv/config.js')

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  ISPROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 5000,
  DBURL: process.env.DATABASE_URL
}

module.exports = config
