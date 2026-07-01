const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/transfer", authMiddleware, transactionController.transfer);

module.exports = router;