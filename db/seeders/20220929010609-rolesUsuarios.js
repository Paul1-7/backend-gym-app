'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles_Usuarios',
      [
        {
          id: 'b4384d48-9cc3-43c4-b610-e03933c45d7f',
          id_usuario: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_rol: '12322c7b-dc62-400f-83e2-3b308d7bace8'
        },
        {
          id: 'a008f097-4539-436a-9860-e249131fc4a3',
          id_usuario: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_rol: '35b63ba1-8019-4836-83a4-c51a42b2f3ec'
        },
        {
          id: '6aa6f1d9-8dc7-46d2-ae78-6dcaafa8916b',
          id_usuario: '6efc6605-0364-4980-8428-4d332fd41cae',
          id_rol: '12322c7b-dc62-400f-83e2-3b308d7bace8'
        },
        {
          id: 'c427887b-4884-4afd-bcd4-c94a4164573d',
          id_usuario: '6efc6605-0364-4980-8428-4d332fd41cae',
          id_rol: '576fae95-3e51-45b8-9b46-9a93c35e8c20'
        },
        {
          id: 'fd51e1bf-34fc-4a6d-a741-7afccd6f4d5f',
          id_usuario: 'b4384d48-9cc3-43c4-b610-e03933c45d7f',
          id_rol: '12322c7b-dc62-400f-83e2-3b308d7bace8'
        },
        {
          id: 'c7837870-7a38-4dfe-b634-e7c6fd0e1539',
          id_usuario: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_rol: '28e921f8-043e-4911-a111-9ad9f31317f6'
        },
        {
          id: '45a0660c-c7eb-4274-8a6c-420244803751',
          id_usuario: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          id_rol: '28e921f8-043e-4911-a111-9ad9f31317f6'
        },
        {
          id: '9bcda705-a743-4099-944c-ab4c75f338a6',
          id_usuario: '6efc6605-0364-4980-8428-4d332fd41cae',
          id_rol: '28e921f8-043e-4911-a111-9ad9f31317f6'
        },
        {
          id: 'a59ae009-9df4-40ba-903a-c2ecf7b8ffe5',
          id_usuario: '6efc6605-0364-4980-8428-4d332fd41cae',
          id_rol: '28e921f8-043e-4911-a111-9ad9f31317f6'
        },
        {
          id: '73635c9e-cd35-4c4c-b101-86f993bc86a9',
          id_usuario: 'b4384d48-9cc3-43c4-b610-e03933c45d7f',
          id_rol: '28e921f8-043e-4911-a111-9ad9f31317f6'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles_Usuarios', null, {})
  }
}
