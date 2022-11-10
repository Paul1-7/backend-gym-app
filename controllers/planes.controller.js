const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/planes.service.js')

const msg = {
  notFound: 'Plan no encontrado',
  delete: 'Plan eliminado',
  addSuccess: 'Plan agregado correctamente'
}

const ListarPlanes = async (req, res, next) => {
  try {
    const planes = await services.ListarPlanes()
    res.json(planes)
  } catch (error) {
    next(error)
  }
}

const BuscarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const plan = await services.BuscarPlan(id)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(plan)
  } catch (error) {
    next(error)
  }
}

const AgregarPlan = async (req, res, next) => {
  try {
    const { body } = req
    await services.AgregarPlan(body)
    res.json({ message: msg.addSuccess })
  } catch (error) {
    next(error)
  }
}

const ModificarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const plan = await services.ModificarPlan(id, body)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(plan)
  } catch (error) {
    next(error)
  }
}

const EliminarPlan = async (req, res, next) => {
  try {
    const { id } = req.params
    const plan = await services.EliminarPlan(id)

    if (!plan) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ListarPlanes,
  BuscarPlan,
  AgregarPlan,
  ModificarPlan,
  EliminarPlan
}
