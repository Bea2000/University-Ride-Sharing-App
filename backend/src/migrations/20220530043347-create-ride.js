'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver: {
        type: Sequelize.STRING
      },
      comuna: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      patente: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      },
      campus: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.BOOLEAN
      },
      img: {
        type: Sequelize.INTEGER

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addColumn(
      'Rides',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', //name of target model
          key: 'id', //key were adding
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rides');
    await queryInterface.removeColumn(
      'Rides', //name of source model
      'VehicleId',
    );
  }
};
