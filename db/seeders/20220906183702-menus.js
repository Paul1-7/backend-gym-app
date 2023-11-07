'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Menus',
      [
        {
          id: 'ebe0f988-2f9c-4fdf-b32e-cc3ee77b36c7',
          nombre: 'Socios',
          estado: 1
        },
        {
          id: '65ac9539-c1d3-45c9-bc37-6b618dba754f',
          nombre: 'Empleados',
          estado: 1
        },
        {
          id: '46e9bf99-93b6-4a15-a481-bc902b1e2276',
          nombre: 'Categorias de Productos',
          estado: 1
        },
        {
          id: '6cb2c339-a8e6-4c76-ae4c-8ad42deceb58',
          nombre: 'Categorias de Disciplina',
          estado: 1
        },
        {
          id: 'e7f4cca5-8490-4d7e-b5a9-ec46f26e6f13',
          nombre: 'Categorias de Maquinarias',
          estado: 1
        },
        {
          id: 'f03c0501-11a8-40e9-89b7-a3d4a5db60b7',
          nombre: 'Disciplinas',
          estado: 1
        },
        {
          id: '6d99bbea-faa6-4b80-9e83-21affcb1637e',
          nombre: 'Programación de clases',
          estado: 1
        },
        {
          id: '6e5e84c8-9e1a-444f-8db4-dd07b994bdea',
          nombre: 'Horarios',
          estado: 1
        },
        {
          id: '28a48f20-a317-4057-8926-2656f2b2a617',
          nombre: 'Salones',
          estado: 1
        },
        {
          id: 'cf98e7b5-0af1-404c-944c-ad315b53a414',
          nombre: 'Productos',
          estado: 1
        },
        {
          id: '9e445ff8-034c-4e87-8341-daf1ea1aa56b',
          nombre: 'Planes',
          estado: 1
        },
        {
          id: '687afffd-41cb-4c1c-afd6-b89b7b3c78c4',
          nombre: 'Suscripciones',
          estado: 1
        },
        {
          id: 'ecd7c180-0471-42f8-913a-8d210b511dc6',
          nombre: 'Maquinarias',
          estado: 1
        },
        {
          id: '150db83b-8fbd-48d6-9a4d-ae8f34e55426',
          nombre: 'Ventas',
          estado: 1
        },
        {
          id: '65b2739a-0037-4bf4-95bf-80385e2e3320',
          nombre: 'Roles',
          estado: 1
        },
        {
          id: 'c4c40183-6f83-4fcf-a5b0-e708f4e880d9',
          nombre: 'Reportes',
          estado: 1
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Menus', null, {})
  }
}
