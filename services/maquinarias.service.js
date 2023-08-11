const { models } = require('../libs/sequelize.js')

async function listarMaquinarias() {
  return await models.Maquinarias.findAll({
    where: {
      borrado: false
    }
  })
}

async function buscarMaquinaria(id) {
  return await models.Maquinarias.findByPk(id, {
    where: {
      borrado: false
    }
  })
}

async function agregarMaquinaria(salon) {
  return await models.Maquinarias.create(salon)
}

async function modificarMaquinaria(id, cambio) {
  const data = await models.Maquinarias.findByPk(id)
  return await data?.update(cambio)
}

async function eliminarMaquinaria(id) {
  const data = await models.Maquinarias.findByPk(id)
  return data.update({ borrado: true })
}

module.exports = {
  listarMaquinarias,
  buscarMaquinaria,
  agregarMaquinaria,
  modificarMaquinaria,
  eliminarMaquinaria
}
