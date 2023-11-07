const express = require('express')

const { listarMenus } = require('../controllers/menus.controller.js')

const Menus = express.Router()

Menus.get('/', listarMenus)

module.exports = Menus
