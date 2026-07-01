/*
==========================================================
File: models/Account.js

Purpose:
Stores bank account information of users.

Used In:
- Account Controller
- Transaction Controller
- Ledger
- Authentication

==========================================================
*/

const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    // Account Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Unique Bank Account Number
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // IFSC Code
    ifscCode: {
      type: String,
      default: "BANK0001234",
    },

    // Current Available Balance
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Account Type
    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      default: "Savings",
    },

    // Account Status
    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);