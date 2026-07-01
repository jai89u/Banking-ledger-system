const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const Ledger = require("../models/Ledger");
const User = require("../models/User");
const emailService = require("../services/email.service");


const generateTransactionId = () => {
  return "TXN" + Date.now();
};

exports.getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user._id });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    return res.status(200).json({
      success: true,
      balance: account.balance
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const user = await User.findById(req.user._id);

    const account = await Account.findOne({
      user: req.user._id
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    const previousBalance = account.balance;

    account.balance += Number(amount);

    await account.save();

    const txnId = generateTransactionId();

    const txn = await Transaction.create({
      transactionId: txnId,
      senderAccount: null,
      receiverAccount: account._id,
      type: "Deposit",
      amount,
      status: "Success"
    });

    await Ledger.create({
      account: account._id,
      transaction: txn._id,
      entryType: "Credit",
      amount,
      balanceBefore: previousBalance,
      balanceAfter: account.balance,
      narration: "Deposit"
    });

    await emailService.sendDepositEmail(
      user.email,
      amount,
      account.balance
    );

    return res.status(200).json({
      success: true,
      message: "Deposit successful",
      balance: account.balance
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const user = await User.findById(req.user._id);

    const account = await Account.findOne({
      user: req.user._id
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    if (account.balance < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance"
      });
    }

    const previousBalance = account.balance;

    account.balance -= Number(amount);

    await account.save();

    const txnId = generateTransactionId();

    const txn = await Transaction.create({
      transactionId: txnId,
      senderAccount: account._id,
      receiverAccount: null,
      type: "Withdraw",
      amount: Number(amount),
      status: "Success"
    });

    await Ledger.create({
      account: account._id,
      transaction: txn._id,
      entryType: "Debit",
      amount: Number(amount),
      balanceBefore: previousBalance,
      balanceAfter: account.balance,
      narration: "Withdraw"
    });

    await emailService.sendWithdrawEmail(
      user.email,
      Number(amount),
      account.balance
    );

    return res.status(200).json({
      success: true,
      message: "Withdraw successful",
      balance: account.balance
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getLedger = async (req, res) => {
  try {
    const account = await Account
      .findOne({ user: req.user._id })
      .populate("user", "name email");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    const ledger = await Ledger.find({ account: account._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      accountHolder: account.user.name,
      email: account.user.email,
      accountNumber: account.accountNumber,
      balance: account.balance,
      ledger
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};