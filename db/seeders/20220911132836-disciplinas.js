'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Disciplinas',
      [
        {
          id: '3fe5aa14-1121-4078-b3b0-2792fa425c6e',
          nombre: 'Entrenamiento en circuito',
          descripcion: 'descripcion 1 ',
          estado: 1,
          id_categoria: '3f6b6557-7f21-491e-967b-cb0baefd8645'
        },
        {
          id: 'f0917a6e-69ca-4f35-bc7f-1c37e54b3010',
          nombre: 'Jiu-Jitsu',
          descripcion: 'descripcion 2 ',
          estado: 1,
          id_categoria: '3f6b6557-7f21-491e-967b-cb0baefd8645'
        },
        {
          id: '2b94f8e3-1e7f-4b9d-bf3f-be8dd187eddb',
          nombre: 'Levantamiento de pesas',
          descripcion: 'descripcion 3 ',
          estado: 1,
          id_categoria: '95e1bfc4-9b8e-4731-af78-5b1f9c4eda4d'
        },
        {
          id: '5b76c1f0-ee81-4bf4-b5c6-588405901d42',
          nombre: 'Yoga',
          descripcion: 'descripcion 4 ',
          estado: 1,
          id_categoria: '3f6b6557-7f21-491e-967b-cb0baefd8645'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Disciplinas', null, {})
  }
}
