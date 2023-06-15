const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/disciplinas.service.js')

const msg = {
  notFound: 'Disciplina no encontrado',
  deleteSuccess: 'Disciplina eliminada correctamente',
  addSuccess: 'Disciplina agregada correctamente',
  modifySuccess: 'Disciplina modificada correctamente'
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

    res.json({message:msg.modifySuccess})
  } catch (error) {
    next(error)
  }
}

const EliminarDisciplinas = async (req, res, next) => {
  try {
    const { id } = req.params
    const existeDisciplina = await services.BuscarDisciplinas(id)
    if (!existeDisciplina) return ERROR_RESPONSE.notFound(msg.notFound, res)

    const disciplinaBorrado = await services.EliminarDisciplinas(id)

    if (disciplinaBorrado instanceof Error)
      return ERROR_RESPONSE.notAcceptable(disciplinaBorrado.message, res)

    res.json({ message: msg.deleteSuccess,id })
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
