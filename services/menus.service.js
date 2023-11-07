const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function obtenerMenus() {
  return await models.Menus.findAll({
    attributes: ['id', 'nombre'],
    include: [
      {
        model: models.Submenus,
        as: 'submenus',

        attributes: ['id', 'nombre', 'isMain']
      }
    ],
    where: {
      nombre: {
        [Op.ne]: 'Roles'
      }
    }
  })
}

module.exports = {
  obtenerMenus
}
