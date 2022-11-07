const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/salones.service.js')

const msg = {
  notFound: 'Salón no encontrado',
  delete: 'Salón eliminado',
  addSuccess: 'Salón agregado correctamente'
}

const ListarSalon = async (req, res, next) => {
  try {
    const salones = await services.ListarSalones()
    res.json(salones)
  } catch (error) {
    next(error)
  }
}

const BuscarSalon = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.BuscarSalon(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const AgregarSalon = async (req, res, next) => {
  try {
    const { body } = req
    await services.AgregarSalon(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarSalon = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const salon = await services.ModificarSalon(id, body)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(salon)
  } catch (error) {
    next(error)
  }
}

const EliminarSalon = async (req, res, next) => {
  try {
    const { id } = req.params
    const salon = await services.EliminarSalon(id)

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarSalon,
  BuscarSalon,
  AgregarSalon,
  ModificarSalon,
  EliminarSalon
}
