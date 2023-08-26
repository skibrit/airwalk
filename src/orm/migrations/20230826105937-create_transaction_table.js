"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("transactions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sar_amount: {
          allowNull: false,
          type: Sequelize.DOUBLE,
        },
        usd_amount: {
          allowNull: false,
          type: Sequelize.DOUBLE,
        },
        status: {
          type: DataTypes.TINYINT,
          defaultValue: 1,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
        },
        is_deleted: {
          type: DataTypes.TINYINT,
          defaultValue: 0,
        },
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("transactions");
  },
};
