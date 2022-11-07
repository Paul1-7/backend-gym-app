const config = require('../config/config')
const cloudinary = require('cloudinary')

cloudinary.v2.config({
  secure: true,
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
})

const options = {
  folder: 'llanta-sur/productos'
}

async function uploadImageCloudinary(filePath) {
  return await cloudinary.v2.uploader.upload(filePath, options)
}

async function removeImgCloudinary(publicId) {
  return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = { uploadImageCloudinary, removeImgCloudinary }
