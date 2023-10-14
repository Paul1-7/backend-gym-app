const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/salones.service.js')
const { generateCodeWithoutDateToDocs } = require('../utils/dataHandler.js')

const msg = {
  notFound: 'Salón no encontrado',
  deleteSuccess: 'Salón eliminado',
  addSuccess: 'Salón agregado correctamente',
  modifySuccess: 'Salón modificado correctamente'
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

    const roomCode = await services.ContarCodigoSalon(body.planta)
    await services.AgregarSalon({
      ...body,
      codSalon: generateCodeWithoutDateToDocs(`S${body.planta}`, roomCode)
    })
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarSalon = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const roomCode = await services.ContarCodigoSalon(body.planta)
    const salon = await services.ModificarSalon(id, {
      ...body,
      codSalon: generateCodeWithoutDateToDocs(`S${body.planta}`, roomCode)
    })

    if (!salon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const EliminarSalon = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeSalon = await services.BuscarSalon(id)
    if (!existeSalon) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const salonBorrado = await services.EliminarSalon(id)

    if (salonBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(salonBorrado.message, res)

    res.json({ message: msg.deleteSuccess, id })
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
