/*
==========================================================
File: utils/generateTransactionId.js

Purpose:
Generates unique transaction IDs.

Example:
TXN-1720102423432

==========================================================
*/

const generateTransactionId = () => {

    return `TXN-${Date.now()}`;

};

module.exports = generateTransactionId;