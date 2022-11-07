const { ERROR_RESPONSE } = require('./error.handle.js')

const msg = {
  isIdNumberValid: 'el id no es valido',
  notFoundId: 'el id no existe',
  notFoundParam: (param) => `no se encontró el valor ${param} en la peticion`,
  isRolesValid: 'los roles no son validos',
  isImageTypeValid: 'la imagen no es valida',
  isImageSizeValid: 'la imagen no debe superar los 1.5mb'
}

function checkId(req, res, next) {
  const { id } = req.params
  const regex =
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/

  if (!id) return ERROR_RESPONSE.notFound(msg.notFoundId, res)
  if (!regex.test(id))
    return ERROR_RESPONSE.notAcceptable(msg.isIdNumberValid, res)
  next()
}

function checkBodyParams(...params) {
  return (req, res, next) => {
    params.forEach((param) => {
      if (!req.body[param])
        return ERROR_RESPONSE.notFound(msg.notFoundParam(param), res)
    })
    next()
  }
}

function fileTypeCheck(req, res, next) {
  if (!req.files?.imagenProd) return next()
  const { mimetype } = req.files.imagenProd
  if (!mimetype) return next()

  const regex = /^image\/(jpeg|png)$/
  if (!regex.test(mimetype))
    return ERROR_RESPONSE.notAcceptable(msg.isImageTypeValid, res)
  next()
}

function fileSizeCheck(req, res, next) {
  if (!req.files?.imagenProd) return next()

  const { size } = req.files.imagenProd
  if (!size) return next()

  if (size > 1500000)
    return ERROR_RESPONSE.notAcceptable(msg.isImageSizeValid, res)
  next()
}

module.exports = { checkId, checkBodyParams, fileTypeCheck, fileSizeCheck }
