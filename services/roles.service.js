const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function buscarRolPorNombre(nombre) {
  return await models.Roles.findOne({ where: { nombre, estado: 1 } })
}
async function buscarRol(id) {
  return await models.Roles.findOne({
    where: { id, estado: 1 },
    include: [
      {
        model: models.Submenus,
        as: 'submenus',
        through: { attributes: [] },
        include: [
          {
            model: models.Menus,
            as: 'menu',
            where: {
              nombre: {
                [Op.ne]: 'Roles'
              }
            }
          }
        ]
      }
    ]
  })
}

async function obtenerRoles(options = {}) {
  return await models.Roles.findAll({
    where: {
      estado: 1
    },
    ...options
  })
}

async function obtenerRolesMenus() {
  return await models.Roles.findAll({
    include: [
      {
        model: models.Submenus,
        as: 'submenus',
        through: { attributes: [] },
        include: [
          {
            model: models.Menus,
            as: 'menu',
            where: {
              nombre: {
                [Op.ne]: 'Roles'
              }
            }
          }
        ]
      }
    ],
    where: {
      estado: 1
    }
  })
}

async function agregarRol(data, options = {}) {
  return await models.Roles.create(data, options)
}
async function modificarRol(id, data, options = {}) {
  return await models.Roles.update(data, { where: { id }, ...options })
}

async function eliminarRol(id, options = {}) {
  return await models.Roles.update({ estado: 0 }, { where: { id }, ...options })
}

module.exports = {
  buscarRolPorNombre,
  obtenerRoles,
  obtenerRolesMenus,
  agregarRol,
  modificarRol,
  buscarRol,
  eliminarRol
}
