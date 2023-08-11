const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/maquinarias.service.js')

const msg = {
  notFound: 'Maquinaria no encontrada',
  deleteSuccess: 'Maquinaria eliminada',
  addSuccess: 'Maquinaria agregada correctamente',
  modifySuccess: 'Maquinaria modificada correctamente'
}

const listarMaquinarias = async (req, res, next) => {
  try {
    const maquinaria = await services.listarMaquinarias()
    res.json(maquinaria)
  } catch (error) {
    next(error)
  }
}

const buscarMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.buscarMaquinaria(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const agregarMaquinaria = async (req, res, next) => {
  try {
    const { body } = req
    await services.agregarMaquinaria(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const modificarMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const data = await services.modificarMaquinaria(id, body)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarMaquinaria = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.eliminarMaquinaria(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.deleteSuccess })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarMaquinarias,
  buscarMaquinaria,
  agregarMaquinaria,
  modificarMaquinaria,
  eliminarMaquinaria
}
