const fs = require('fs-extra')
const { uploadImageCloudinary } = require('../libs/cloudinary')

async function removeTempImg(filePath) {
  return await fs.unlink(filePath)
}

async function uploadImage(filePath) {
  try {
    const result = await uploadImageCloudinary(filePath)

    await removeTempImg(filePath)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { removeTempImg, uploadImage }
