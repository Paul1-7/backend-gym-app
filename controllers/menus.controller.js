const services = require('../services/menus.service.js')

const listarMenus = async (req, res, next) => {
  try {
    const data = await services.obtenerMenus()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarMenus
}
