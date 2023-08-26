"use strict";

//business logic classes
const { validationResult } = require("express-validator");
const TransactionManager = require("../classes/TransactionManager");
const CurrencyManager = require("../classes/CurrencyManager");
const ErrorManager = require("../classes/ErrorManager");

/**
 * @param {amount} req Requires the amount to create a transaction
 * @returns Returns the success or error status with the transaction Id if available
 */
const createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      errors: errors.array(),
    });
  }
  try {
    const { amount: sar_amount } = req.body;
    const conversionRate = await CurrencyManager.convert(
      CurrencyManager.CURRENCIES.SAR,
      CurrencyManager.CURRENCIES.USD,
      sar_amount
    );
    const usd_amount = conversionRate?.rates?.USD?.rate_for_amount;
    const trxID = await TransactionManager.createTransaction(
      sar_amount,
      usd_amount
    );

    res.json({
      status: 200,
      msg: `Transaction created successfully ${trxID}`,
    });
  } catch (error) {
    return res.json({
      status: 500,
      errors: [{ msg: ErrorManager.decodeError(error) }],
    });
  }
};

/**
 * @param {id} req Requires a id in the url path
 * @returns returns the transaction detail based on the id
 */
const getTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      errors: errors.array(),
    });
  }
  try {
    const { id } = req.params;
    const trxDetail = await TransactionManager.getTransaction(id);

    if (!trxDetail) {
      return res.json({
        status: 400,
        data: `No transaction detail found`,
      });
    }

    res.json({
      status: 200,
      data: trxDetail,
    });
  } catch (error) {
    return res.json({
      status: 500,
      errors: [{ msg: ErrorManager.decodeError(error) }],
    });
  }
};

/**
 * @returns returns the transaction report. Count of the transaction and sum amount of SAR and USD currency
 */
const getTransactionReport = async (req, res) => {
  try {
    const trxReport = await TransactionManager.getTransactionReport();

    if (!trxReport) {
      return res.json({
        status: 400,
        data: `No Report found`,
      });
    }

    res.json({
      status: 200,
      data: trxReport,
    });
  } catch (error) {
    return res.json({
      status: 500,
      errors: [{ msg: ErrorManager.decodeError(error) }],
    });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactionReport,
};
