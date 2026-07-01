/*
==========================================================
File: models/Transaction.js

Purpose:
Stores every banking transaction.

Used In:
- Deposit
- Withdraw
- Transfer
- Transaction History

==========================================================
*/

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // Unique Transaction ID
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    // Sender Account
    senderAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    // Receiver Account
    receiverAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    // Transaction Type
    type: {
      type: String,
      enum: ["Deposit", "Withdraw", "Transfer"],
      required: true,
    },

    // Amount
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    // Transaction Status
    status: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },

    // Optional Note
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);