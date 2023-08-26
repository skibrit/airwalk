const moment = require("moment");
const TransactionManager = require("./TransactionManager");

class CronManager {
  init() {
    // Run this cron on every 1hour
    cron.schedule("0 * * * *", () => {
      this.checkTransactionOnEachHour();
    });
  }

  async checkTransactionOnEachHour() {
    const dt = moment().subtract(1, "hour");
    const trxList = await TransactionManager.getTransactionByDate(dt.toDate());
    const txCount = trxList?.length;
    if (txCount >= 5) {
      console.log(
        `EVENT LOG: ${trxList.length} transaction happened on the last hour`
      );
    }
  }
}

const Instance = new CronManager();

module.exports = Instance;
