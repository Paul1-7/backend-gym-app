const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { EliminarInscripcion } = require('../services/inscripcion.service.js')

const services = require('../services/usuarios.service.js')
const { SOCIO } = require('../config/roles.js')
const { buscarRolPorNombre } = require('../services/roles.service.js')
const { agregarRolUsuario } = require('../services/rolesUsuarios.services.js')
const { BuscarPlan } = require('../services/planes.service.js')
const { agregarDiasAFecha } = require('../utils/dataHandler.js')
const { AgregarSuscripcion } = require('../services/suscripciones.service.js')
const sequelize = require('../libs/sequelize.js')

const msg = {
  notFound: 'Socio no encontrado',
  delete: 'Socio eliminado',
  notValid: 'La informacion no es valida',
  addSuccess: 'Socio agregado correctamente',
  updateSuccess: 'Socio actualizado correctamente'
}

const ListarSocios = async (req, res, next) => {
  try {
    const active = false
    const socios = await services.obtenerUsuariosPorRol(active, [SOCIO])
    res.json(socios)
  } catch (error) {
    next(error)
  }
}

const BuscarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    const socios = await services.buscarUsuario(id)

    if (!socios) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(socios)
  } catch (error) {
    next(error)
  }
}

const AgregarSocios = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { idPlan, cantidad, fechaInicio, fechaFin, ...socio } = req.body
    const rolSocio = await buscarRolPorNombre(SOCIO)

    const { id: idRol } = rolSocio

    const newsocios = await services.crearUsuario(socio, { transaction })

    const plan = await BuscarPlan(idPlan)
    if (plan) {
      const newSuscripcion = {
        idPlan,
        cantidad,
        idSocio: newsocios.toJSON().id,
        fechaInicio,
        fechaFin,
        montoCancelado: plan.precio * cantidad
      }
      await AgregarSuscripcion(newSuscripcion, { transaction })
    }

    await agregarRolUsuario(newsocios.dataValues.id, [{ idRol }], {
      transaction
    })
    await transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const ModificarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const existSocios = await services.buscarUsuario(id)
    if (!existSocios) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await services.actualizarUsuario(id, body)

    res.json({ id, message: msg.updateSuccess })
  } catch (error) {
    next(error)
  }
}

const EliminarSocios = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeSocio = await services.buscarUsuario(id)
    if (!existeSocio) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const socioBorrado = await services.borrarUsuario(id)

    if (socioBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(socioBorrado.message, res)

    res.json({ message: msg.delete, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarSocios,
  BuscarSocios,
  AgregarSocios,
  ModificarSocios,
  EliminarSocios
}
