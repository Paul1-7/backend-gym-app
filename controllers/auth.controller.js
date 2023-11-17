const { compare } = require('bcrypt')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/usuarios.service.js')

const msg = {
  notFound: 'credenciales incorrectas',
  noRol: 'El rol del usuario ya no esta disponible'
}

const loginUsuario = async (req, res, next) => {
  try {
    const { usuario, password } = req.body

    const data = await services.buscarUsuarioPorOpciones({ usuario })

    if (!data) return ERROR_RESPONSE.notFound(msg.notFound, res)

    if (!data.roles.length) return ERROR_RESPONSE.notFound(msg.noRol, res)

    const isValidPassword = await compare(password, data.password)

    if (!isValidPassword) return ERROR_RESPONSE.notFound(msg.notFound, res)

    delete data.password
    res.json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUsuario
}
