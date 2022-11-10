const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function ListarDisciplinas() {
  return await models.Disciplinas.findAll()
}

async function BuscarDisciplinas(id) {
  return await models.Disciplinas.findByPk(id)
}

async function BuscarDisciplinasPorIds(ids) {
  return await models.Disciplinas.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })
}

async function agregarDisciplina(disciplinas) {
  return await models.Disciplinas.create(disciplinas)
}

async function ModificarDisciplinas(id, cambio) {
  const user = await models.Disciplinas.findByPk(id)
  return await user?.update(cambio)
}

async function EliminarDisciplinas(id) {
  const user = await models.Disciplinas.findByPk(id)
  return await user?.destroy()
}

module.exports = {
  ListarDisciplinas,
  BuscarDisciplinas,
  agregarDisciplina,
  ModificarDisciplinas,
  EliminarDisciplinas,
  BuscarDisciplinasPorIds
}
