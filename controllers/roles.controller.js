const { Op } = require('sequelize')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/roles.service.js')
const sequelize = require('../libs/sequelize.js')
const { agregarRolSubmenu } = require('../services/rolesSubmenus.services.js')

const msg = {
  notFound: 'Rol no encontrado',
  deleteSuccess: 'Rol eliminado',
  addSuccess: 'Rol agregado correctamente',
  modifySuccess: 'Rol modificado correctamente'
}

const listarRoles = async (req, res, next) => {
  try {
    const planes = await services.obtenerRolesMenus()
    res.json(planes)
  } catch (error) {
    next(error)
  }
}

const buscarRol = async (req, res, next) => {
  try {
    const { id } = req.params
    const plan = await services.BuscarRol(id)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(plan)
  } catch (error) {
    next(error)
  }
}

const agregarRol = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { body } = req
    const { nombre, idMenus } = body
    const savedRol = await services.agregarRol({ nombre }, { transaction })

    const rolesSubmenus = idMenus.map((idSubmenu) => ({
      idSubmenu,
      idRol: savedRol.toJSON().id
    }))

    await agregarRolSubmenu(rolesSubmenus, { transaction })
    await transaction.commit()
    res.json({ message: msg.addSuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const modificarRol = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { esRecurrente, fechaVencimiento } = body

    const plan = await services.ModificarRol(id, {
      ...body,
      fechaVencimiento: Number(esRecurrente) === 1 ? null : fechaVencimiento
    })

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.modifySuccess })
  } catch (error) {
    next(error)
  }
}

const eliminarRol = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeRol = await services.BuscarRol(id)
    if (!existeRol) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const planBorrado = await services.EliminarRol(id)

    if (planBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(planBorrado.message, res)

    res.json({ message: msg.deleteSuccess, id })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarRoles,
  buscarRol,
  agregarRol,
  modificarRol,
  eliminarRol
}
