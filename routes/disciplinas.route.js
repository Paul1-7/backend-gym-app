const express = require('express')
const { ListarDisciplinas, BuscarDisciplinas, AgregarDisciplinas, ModificarDisciplinas, EliminarDisciplinas } = require('../controllers/disciplinas.controller.js')
const { checkId } = require('../middlewares/validator.handle.js')



const Disciplinas = express.Router()

Disciplinas.get('/', ListarDisciplinas)
Disciplinas.get('/:id', checkId, BuscarDisciplinas)
Disciplinas.post('/', AgregarDisciplinas)
Disciplinas.put('/:id', checkId, ModificarDisciplinas)
Disciplinas.delete('/:id', checkId, EliminarDisciplinas)

module.exports = Disciplinas
