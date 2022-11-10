'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Disciplinas',
      [
        {
          id: '3fe5aa14-1121-4078-b3b0-2792fa425c6e',
          nombre: 'disciplina 1',
          descripcion: 'descripcion 1 ',
          estado: 1
        },
        {
          id: 'f0917a6e-69ca-4f35-bc7f-1c37e54b3010',
          nombre: 'disciplina 2',
          descripcion: 'descripcion 2 ',
          estado: 1
        },
        {
          id: '2b94f8e3-1e7f-4b9d-bf3f-be8dd187eddb',
          nombre: 'disciplina 3',
          descripcion: 'descripcion 3 ',
          estado: 1
        },
        {
          id: '5b76c1f0-ee81-4bf4-b5c6-588405901d42',
          nombre: 'disciplina 4',
          descripcion: 'descripcion 4 ',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Disciplinas', null, {})
  }
}
