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
    },
    include: [
      {
        model: models.Categorias_Disciplinas,
        include: ['disciplina'],
        as: 'disciplinas'
      },
      {
        model: models.Categorias_Productos,
        include: ['producto'],
        as: 'productos'
      },
      {
        model: models.Categorias_Maquinarias,
        include: ['maquinaria'],
        as: 'maquinarias'
      }
    ]
  })
}

async function AgregarCategoria(data, options = {}) {
  return await models.Categorias.create(data, options)
}

async function ModificarCategoria(id, cambio, options = {}) {
  return await models.Categorias.update(cambio, { where: { id }, ...options })
}

async function EliminarCategoria(id) {
  const data = await models.Categorias.update(
    { estado: 0 },
    {
      where: {
        id
      }
    }
  )

  return data > 0
}

module.exports = {
  ListarCategorias,
  BuscarCategoria,
  AgregarCategoria,
  ModificarCategoria,
  EliminarCategoria
}
