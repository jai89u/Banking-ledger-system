const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/balance", authMiddleware, accountController.getBalance);
router.post("/deposit", authMiddleware, accountController.deposit);
router.post("/withdraw", authMiddleware, accountController.withdraw);
router.get("/ledger", authMiddleware, accountController.getLedger);
module.exports = router;