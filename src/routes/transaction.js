const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransaction,
} = require("../controllers/transactionCtrl");
const { check } = require("express-validator");
//const config = require("config");

// @ROUTE : POST api/transaction
// @DESC  : This route allows to create a transaction in SAR currency
// @Access : Public
router.post(
  "/",
  [[check("amount", "Amount is required").not().isEmpty()]],
  createTransaction
);

// @ROUTE : GET api/transaction/:id
// @DESC  : This route allows to create a transaction in SAR currency
// @Access : Public
router.get("/:id", getTransaction);

module.exports = router;
