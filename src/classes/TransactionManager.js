const db = require("../orm/models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Transaction = db.sequelize.models.transactions;

class TransactionManager {
  async createTransaction(sar_amount, usd_amount) {
    const result = await Transaction.create({
      sar_amount,
      usd_amount,
    });
    return result.id;
  }

  async getTransaction(trxId) {
    const result = await Transaction.findOne({
      where: { id: trxId },
      attributes: ["id", "sar_amount", "usd_amount", "createdAt"],
    });
    return result;
  }

  async getTransactionByDate(dt) {
    const result = await Transaction.findAll({
      where: {
        createdAt: {
          [Op.gt]: dt,
        },
      },
    });
    return result;
  }

  async getTransactionReport() {
    const result = await Transaction.findAll({
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "totalTransaction"],
        [
          db.sequelize.fn(
            "ROUND",
            db.sequelize.fn("SUM", db.sequelize.col("sar_amount")),
            4
          ),
          "totalSARAmount",
        ],
        [
          db.sequelize.fn(
            "ROUND",
            db.sequelize.fn("SUM", db.sequelize.col("usd_amount")),
            4
          ),
          "totalUSDAmount",
        ],
      ],
    });
    return result;
  }
}

const Instance = new TransactionManager();

module.exports = Instance;
