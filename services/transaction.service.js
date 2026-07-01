const mongoose = require("mongoose");

const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const Ledger = require("../models/Ledger");

const generateTransactionId = () => {
  return "TXN" + Date.now();
};

const transferMoney = async (fromUserId, toAccountNumber, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const senderAccount = await Account.findOne({ user: fromUserId }).session(session);

    if (!senderAccount) {
      throw new Error("Sender account not found");
    }

    if (senderAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const receiverAccount = await Account.findOne({ accountNumber: toAccountNumber }).session(session);

    if (!receiverAccount) {
      throw new Error("Receiver account not found");
    }

    const senderPrevBalance = senderAccount.balance;
    const receiverPrevBalance = receiverAccount.balance;

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    const txnId = generateTransactionId();

    const txn = await Transaction.create(
      [
        {
          transactionId: txnId,
          senderAccount: senderAccount._id,
          receiverAccount: receiverAccount._id,
          type: "Transfer",
          amount,
          status: "Success"
        }
      ],
      { session }
    );

    await Ledger.insertMany(
      [
        {
          account: senderAccount._id,
          transaction: txn[0]._id,
          entryType: "Debit",
          amount,
          balanceBefore: senderPrevBalance,
          balanceAfter: senderAccount.balance,
          narration: `Sent to ${toAccountNumber}`
        },
        {
          account: receiverAccount._id,
          transaction: txn[0]._id,
          entryType: "Credit",
          amount,
          balanceBefore: receiverPrevBalance,
          balanceAfter: receiverAccount.balance,
          narration: `Received from ${senderAccount.accountNumber}`
        }
      ],
      { session, ordered: true }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      transactionId: txnId
    };

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = {
  transferMoney
};