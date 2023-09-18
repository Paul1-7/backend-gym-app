const { models } = require('../libs/sequelize.js')

async function ListarCategorias(options = {}) {
  const sequelizeOptions = {
    where: {
      estado: 1,
      ...options
    }
  }

  return await models.Categorias.findAll(sequelizeOptions)
}

async function BuscarCategoria(id) {
  return await models.Categorias.findOne({
    where: {
      estado: 1,
      id
    }
  })
}

async function AgregarCategoria(salon) {
  return await models.Categorias.create(salon)
}

async function ModificarCategoria(id, cambio) {
  const salon = await models.Categorias.findByPk(id)
  return await salon?.update(cambio)
}

async function EliminarCategoria(id) {
  const salon = await models.Categorias.update(
    { estado: 0 },
    {
      where: {
        id
      }
    }
  )

  return salon > 0
}

module.exports = {
  ListarCategorias,
  BuscarCategoria,
  AgregarCategoria,
  ModificarCategoria,
  EliminarCategoria
}
