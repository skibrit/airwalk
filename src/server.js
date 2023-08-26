const express = require("express");
const app = express();
const cors = require("cors");

const routeList = require("./routeList");
const PORT = process.env.PORT || 6010;

//add middleware parse
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// attach routes
app.use("/api/transaction", routeList.Transaction);
app.use("/api/analytics", routeList.Analytics);

app.get("/", function (req, res) {
  res.send("Welcome to Microservice of Airwrk");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  const CronManager = require("./classes/CronManager");
  CronManager.checkTransactionOnEachHour();
});
