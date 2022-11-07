require('dotenv/config.js')

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  ISPROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 5000,
  DBUSER: process.env.DB_USER,
  DBPASSWORD: process.env.DB_PASSWORD,
  DBHOST: process.env.DB_HOST,
  DBNAME: process.env.DB_NAME,
  DBPORT: process.env.DB_lPORT,
  DBURL: process.env.DATABASE_URL,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  DEFAULT_PRODUCT_IMG_URl: process.env.DEFAULT_PRODUCT_IMG_URl
}

module.exports = config

