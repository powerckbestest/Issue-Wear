/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Sizes',
      [
        {
          title: 'S',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'M',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'L',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'XL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'XXL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Брюки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Футболки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Худи',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Свитшот',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Colors',
      [
        {
          title: 'Белый',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Черный',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Синий',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Зеленый',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          title: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'guest',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
