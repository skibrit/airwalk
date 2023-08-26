const express = require("express");
const router = express.Router();
const { getTransactionReport } = require("../controllers/transactionCtrl");

// @ROUTE : GET api/analytics
// @DESC  : This route returns the total count of the transaction and the total amount of usd and sar currency
// @Access : Public
router.get("/", getTransactionReport);

module.exports = router;
