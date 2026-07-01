/*
==========================================================
File: utils/generateAccountNumber.js

Purpose:
Generates a unique 10-digit account number.

==========================================================
*/

const generateAccountNumber = () => {

    const randomNumber = Math.floor(
        1000000000 + Math.random() * 9000000000
    );

    return randomNumber.toString();

};

module.exports = generateAccountNumber;