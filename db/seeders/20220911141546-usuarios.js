'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          id: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          ci: '7813849232',
          nombre: 'Mario',
          apellido_p: 'Caceres',
          apellido_m: 'Romero',
          edad: 15,
          celular: '71893932',
          direccion: 'direccion 1',
          usuario: null,
          password: null,
          estado: 1
        },
        {
          id: '8d67ccd1-aeb7-455a-b2dc-13813536129d',
          ci: '718920872',
          nombre: 'Juan Carlos',
          apellido_p: 'Ramos',
          apellido_m: 'Lopez',
          edad: 25,
          celular: '71820282',
          direccion: 'direccion 2',
          usuario: null,
          password: null,
          estado: 1
        },
        {
          id: 'd611bf1b-8f16-4c4d-824b-89dc3beaed68',
          ci: '7813849',
          nombre: 'Martha',
          apellido_p: 'Llanos',
          apellido_m: 'Martinez',
          edad: 23,
          celular: '61829372',
          direccion: 'direccion 2',
          usuario: null,
          password: null,
          estado: 1
        },
        {
          id: '7ee227da-3abb-4c03-90f2-39142f9d25ff',
          ci: '71898916',
          nombre: 'Ana',
          apellido_p: 'Rosales',
          apellido_m: 'Vaca',
          edad: 15,
          celular: '719191681',
          direccion: 'direccion 1',
          usuario: null,
          password: null,
          estado: 1
        },
        {
          id: '6efc6605-0364-4980-8428-4d332fd41cae',
          ci: '71829916',
          nombre: 'Romina',
          apellido_p: 'Martinez',
          apellido_m: 'Loza',
          edad: 15,
          celular: '7198191',
          direccion: 'direccion 1',
          usuario: null,
          password: null,
          estado: 1
        },
        {
          id: 'b4384d48-9cc3-43c4-b610-e03933c45d7f',
          ci: '7181988916',
          nombre: 'Mateo',
          apellido_p: 'Espindola',
          apellido_m: 'Rios',
          edad: 15,
          celular: '68198177',
          direccion: 'direccion 1',
          usuario: null,
          password: null,
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {})
  }
}
