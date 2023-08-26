module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transactions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      sar_amount: {
        type: DataTypes.DOUBLE,
      },
      usd_amount: {
        type: DataTypes.DOUBLE,
      },
      status: {
        type: DataTypes.TINYINT,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      is_deleted: {
        type: DataTypes.TINYINT,
      },
    },
    { tableName: "transactions" }
  );
  return Transaction;
};
