/*
==========================================================
File: services/email.service.js

Purpose:
Sends emails for:
- Registration
- Deposit
- Withdraw
- Transfer
- Failed Transfer

==========================================================
*/

const transporter = require("../config/mail");

/*
==========================================
Generic Email Sender
==========================================
*/

const sendEmail = async (to, subject, html) => {

    try {

        await transporter.sendMail({

            from: `"Banking Transaction System" <${process.env.MAIL_USER}>`,

            to,

            subject,

            html

        });

        console.log("Email Sent Successfully");

    } catch (error) {

        console.log("Email Sending Failed");
        console.log(error.message);

    }

};

/*
==========================================
Registration Email
==========================================
*/

const sendRegistrationEmail = async (email, name) => {

    const subject = "Welcome to Banking Transaction System";

    const html = `
        <h2>Welcome ${name}</h2>

        <p>Your account has been created successfully.</p>

        <p>Thank you for joining us.</p>
    `;

    await sendEmail(email, subject, html);

};

const sendLoginEmail = async (email, name) => {

    const subject = "Login Alert";

    const html = `
        <h2>Login Successful</h2>

        <p>Hello ${name},</p>

        <p>Your account has been logged in successfully.</p>

        <p>Time: ${new Date().toLocaleString()}</p>
    `;

    await sendEmail(email, subject, html);

};





/*
==========================================
Deposit Email
==========================================
*/

const sendDepositEmail = async (email, amount, balance) => {

    const subject = "Deposit Successful";

    const html = `
        <h2>Deposit Successful</h2>

        <p>Amount Deposited : ₹${amount}</p>

        <p>Available Balance : ₹${balance}</p>
    `;

    await sendEmail(email, subject, html);

};

/*
==========================================
Withdraw Email
==========================================
*/

const sendWithdrawEmail = async (email, amount, balance) => {

    const subject = "Withdrawal Successful";

    const html = `
        <h2>Withdrawal Successful</h2>

        <p>Amount Withdrawn : ₹${amount}</p>

        <p>Available Balance : ₹${balance}</p>
    `;

    await sendEmail(email, subject, html);

};

/*
==========================================
Transfer Success Email
==========================================
*/

const sendTransferEmail = async (
    email,
    amount,
    receiverAccount,
    balance
) => {

    const subject = "Money Transfer Successful";

    const html = `
        <h2>Money Transfer Successful</h2>

        <p>Transferred Amount : ₹${amount}</p>

        <p>Receiver Account : ${receiverAccount}</p>

        <p>Remaining Balance : ₹${balance}</p>
    `;

    await sendEmail(email, subject, html);

};

/*
==========================================
Failed Transfer Email
==========================================
*/

const sendFailedTransferEmail = async (
    email,
    amount,
    reason
) => {

    const subject = "Money Transfer Failed";

    const html = `
        <h2>Transaction Failed</h2>

        <p>Amount : ₹${amount}</p>

        <p>Reason : ${reason}</p>
    `;

    await sendEmail(email, subject, html);

};




module.exports = {

    sendRegistrationEmail,

    sendLoginEmail,

    sendDepositEmail,

    sendWithdrawEmail,

};