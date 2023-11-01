const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function ListarDisciplinas() {
  return await models.Disciplinas.findAll({
    include: ['categoria']
  })
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
  const discipline = await models.Disciplinas.findByPk(id)
  return await discipline?.update(cambio)
}

async function EliminarDisciplinas(id) {
  const discipline = await models.Disciplinas.findByPk(id, {
    include: ['horarios']
  })

  if (discipline.horarios.length > 0) return new Error(msg.msgErrorForeignKey)

  return await discipline?.destroy()
}

module.exports = {
  ListarDisciplinas,
  BuscarDisciplinas,
  agregarDisciplina,
  ModificarDisciplinas,
  EliminarDisciplinas,
  BuscarDisciplinasPorIds
}
