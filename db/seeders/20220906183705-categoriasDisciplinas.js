'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias_Disciplinas',
      [
        {
          id: 'e271c58f-32df-48c0-b35d-0648346df03d',
          nombre: 'Entrenamiento de resistencia',
          estado: 1
        },
        {
          id: 'a8c65ea2-6bad-43e3-ac2e-a257eb34e439',
          nombre: 'Artes marciales',
          estado: 1
        },
        {
          id: '95e1bfc4-9b8e-4731-af78-5b1f9c4eda4d',
          nombre: 'Musculación',
          estado: 1
        },
        {
          id: '3f6b6557-7f21-491e-967b-cb0baefd8645',
          nombre: 'Clases grupales',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias_Disciplinas', null, {})
  }
}
