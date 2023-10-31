'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categorias_Maquinarias',
      [
        {
          id: 'e271c58f-32df-48c0-b35d-0648346df03d',
          nombre: 'Cardio',
          estado: 1
        },
        {
          id: 'a8c65ea2-6bad-43e3-ac2e-a257eb34e439',
          nombre: 'Fuerza',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias_Maquinarias', null, {})
  }
}
