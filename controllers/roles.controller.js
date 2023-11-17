const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/roles.service.js')
const sequelize = require('../libs/sequelize.js')
const {
  agregarRolSubmenu,
  actualizarRolSubmenu
} = require('../services/rolesSubmenus.services.js')

const msg = {
  notFound: 'Rol no encontrado',
  deleteSuccess: 'Rol eliminado',
  addSuccess: 'Rol agregado correctamente',
  modifySuccess: 'Rol modificado correctamente'
}

const listarRoles = async (req, res, next) => {
  try {
    const data = await services.obtenerRolesMenus()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const buscarRol = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await services.buscarRol(id)

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(data)
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
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { body } = req
    const { nombre, idMenus } = body

    await services.modificarRol(id, { nombre }, { transaction })

    const rolesSubmenus = idMenus.map((idSubmenu) => ({
      idSubmenu,
      idRol: id
    }))

    await actualizarRolSubmenu(id, rolesSubmenus, { transaction })
    await transaction.commit()
    res.json({ message: msg.modifySuccess })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const eliminarRol = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeRol = await services.BuscarRol(id)
    if (!existeRol) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const dataBorrado = await services.EliminarRol(id)

    if (dataBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(dataBorrado.message, res)

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
