'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Horarios',
      [
        {
          id: '96c5bdf0-a156-4b22-b5fc-1e375f1e099c',
          id_salon: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          id_disciplina: '3fe5aa14-1121-4078-b3b0-2792fa425c6e',
          horario_entrada: '2023-06-15T10:00:00-04:00',
          id_entrenador: 'd9e42cd8-9399-4e0f-9eed-cb68f2f23549',
          estado: 1,
          horario_salida: '2023-06-15T10:30:00-04:00'
        },
        {
          id: 'fa1a27e6-328f-4400-b1d1-5e6cd97a5dd2',
          id_salon: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          id_disciplina: 'f0917a6e-69ca-4f35-bc7f-1c37e54b3010',
          horario_entrada: '2023-06-13T10:30:00-04:00',
          id_entrenador: '6efc6605-0364-4980-8428-4d332fd41cae',
          estado: 1,
          horario_salida: '2023-06-13T10:30:00-04:00'
        },
        {
          id: 'a008f097-4539-436a-9860-e249131fc4a3',
          id_salon: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          id_disciplina: '3fe5aa14-1121-4078-b3b0-2792fa425c6e',
          horario_entrada: '2023-06-11T10:30:00-04:00',
          id_entrenador: '6efc6605-0364-4980-8428-4d332fd41cae',
          estado: 1,
          horario_salida: '2023-06-11T10:30:00-04:00'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Horarios', null, {})
  }
}
