const ApiManager = require("./ApiManager");
const config = require("config");

class CurrencyManager {
  CURRENCIES = {
    SAR: "SAR",
    USD: "USD",
  };

  constructor() {
    const { EXCHANGE_API_ENDPOINT, EXCHANGE_API_KEY } = config;
    this.EXCHANGE_API_URL = `${EXCHANGE_API_ENDPOINT}`;
    this.EXCHANGE_API_KEY = `${EXCHANGE_API_KEY}`;
  }

  convert(from, to, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.EXCHANGE_API_URL}/convert/?api_key=${this.EXCHANGE_API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`;
        const conversion = await ApiManager.request({
          method: "GET",
          uri: url,
        });

        resolve(conversion);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

const Instance = new CurrencyManager();

module.exports = Instance;
