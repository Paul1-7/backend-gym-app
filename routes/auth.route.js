const express = require('express')
const { loginUsuario } = require('../controllers/auth.controller.js')

const Auth = express.Router()

Auth.post('/', loginUsuario)

module.exports = Auth
