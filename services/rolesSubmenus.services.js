const { models } = require('../libs/sequelize.js')

async function agregarRolSubmenu(data, options = {}) {
  return await models.Roles_Submenus.bulkCreate(data, options)
}

async function eliminarRolSubmenu(idRol, options = {}) {
  return await models.Roles_Submenus.destroy({
    where: { idRol },
    ...options
  })
}

async function actualizarRolSubmenu(idRol, data, options = {}) {
  await eliminarRolSubmenu(idRol, options)
  return await agregarRolSubmenu(data, options)
}

module.exports = {
  agregarRolSubmenu,
  eliminarRolSubmenu,
  actualizarRolSubmenu
}
