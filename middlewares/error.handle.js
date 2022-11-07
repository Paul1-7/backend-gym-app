// function ormErrorHandler(err, req, res, next) {
//   if (err instanceof ValidationError) {
//     res.status(409).json({
//       statusCode: 409,
//       message: err.name,
//       errors: err.errors
//     })
//   }
//   next(err)
// }

const ERROR_RESPONSE = {
    notFound: (msg, res) => {
      return res.status(404).json({ message: msg })
    },
    badRequest: (msg, res) => {
      return res.status(400).json({ message: msg })
    },
    notAcceptable: (msg, res) => {
      return res.status(406).json({ message: msg })
    }
  }
  
  function errorHandler(err, req, res, next) {
    console.log({ err })  
    res.status(500).json(err)
  }
  
  module.exports = { errorHandler, ERROR_RESPONSE }
  