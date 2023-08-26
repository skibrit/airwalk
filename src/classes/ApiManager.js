const rp = require("request-promise");

class ApiCaller {
  request(options) {
    return new Promise((resolve, reject) => {
      rp(options)
        .then(function (body) {
          resolve(JSON.parse(body));
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

const Instance = new ApiCaller();

module.exports = Instance;
