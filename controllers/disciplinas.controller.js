const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/disciplinas.service.js')

const msg = {
  notFound: 'Disciplina no encontrado',
  delete: 'Disciplina eliminado',
  addSuccess: 'Disciplina agregada correctamente'
}

const ListarDisciplinas = async (req, res, next) => {
  try {
    const disciplinas = await services.ListarDisciplinas()
    res.json(disciplinas)
  } catch (error) {
    next(error)
  }
}

const BuscarDisciplinas = async (req, res, next) => {
  try {
    const { id } = req.params
    const disciplinas = await services.BuscarDisciplinas(id)

    if (!disciplinas) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(disciplinas)
  } catch (error) {
    next(error)
  }
}

const AgregarDisciplinas = async (req, res, next) => {
  try {
    const { body } = req
    await services.agregarDisciplina(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarDisciplinas = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const disciplinas = await services.ModificarDisciplinas(id, body)

    if (!disciplinas) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(disciplinas)
  } catch (error) {
    next(error)
  }
}

const EliminarDisciplinas = async (req, res, next) => {
  try {
    const { id } = req.params
    const disciplinas = await services.EliminarDisciplinas(id)

    if (!disciplinas) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarDisciplinas,
  BuscarDisciplinas,
  AgregarDisciplinas,
  ModificarDisciplinas,
  EliminarDisciplinas
}
