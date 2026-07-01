# Banking Ledger System

A secure Banking Ledger System REST API built with **Node.js**, **Express.js**, and **MongoDB**. The project allows users to register, log in, manage bank accounts, perform deposits, withdrawals, fund transfers, and view transaction history with ledger entries. It also sends email notifications for important banking activities.

## Features

* User Registration
* User Login with JWT Authentication
* Secure Password Hashing using bcrypt
* Automatic Bank Account Creation
* Deposit Money
* Withdraw Money
* Fund Transfer Between Accounts
* Transaction Ledger
* Account Balance API
* Transaction History
* Email Notifications

  * Registration
  * Login
  * Deposit
  * Withdrawal
  * Money Transfer
* MongoDB Transactions (Session Based)
* Error Handling Middleware
* RESTful API Architecture

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Nodemailer
* dotenv

## Project Structure

```text
Banking-ledger-system/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── app.js
├── server.js
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/jai89u/Banking-ledger-system.git
```

Go to the project directory:

```bash
cd Banking-ledger-system
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=YOUR_EMAIL
MAIL_PASS=YOUR_APP_PASSWORD
```

Start the server:

```bash
npm start
```

or

```bash
npm run dev
```

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Account

* GET `/api/account/balance`
* POST `/api/account/deposit`
* POST `/api/account/withdraw`
* GET `/api/account/ledger`

### Transactions

* POST `/api/transaction/transfer`

## Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* MongoDB Session Transactions
* Input Validation
* Error Handling Middleware

## Future Enhancements

* Admin Dashboard
* OTP Verification
* Account Statement PDF
* Password Reset via Email
* Interest Calculation
* Scheduled Transactions
* Beneficiary Management
* Docker Deployment

## Author

**Mritunjay Gupta**

GitHub: https://github.com/jai89u
