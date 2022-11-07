'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: '35b63ba1-8019-4836-83a4-c51a42b2f3ec',
          nombre: 'Administrador'
        },
        {
          id: '576fae95-3e51-45b8-9b46-9a93c35e8c20',
          nombre: 'Recepcionista'
        },
        {
          id: '12322c7b-dc62-400f-83e2-3b308d7bace8',
          nombre: 'Entrenador'
        },
        {
          id: 'd036ff13-a438-4469-8a65-f8f62f559319',
          nombre: 'Limpieza'
        },
        {
          id: '28e921f8-043e-4911-a111-9ad9f31317f6',
          nombre: 'Socio'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
