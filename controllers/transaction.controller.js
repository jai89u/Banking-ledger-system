const { transferMoney } = require("../services/transaction.service");

/*

POST /api/transaction/transfer

POST http://localhost:5000/api/transaction/transfer

Body:
{
"toAccountNumber": "1000000001",
"amount": 500
}

*/

exports.transfer = async (req, res) => {

try {
const { toAccountNumber, amount } = req.body;

if (!toAccountNumber || !amount) {
  return res.status(400).json({
    success: false,
    message: "Invalid input"
  });
}

const result = await transferMoney(
  req.user.id,
  toAccountNumber,
  Number(amount)
);

return res.status(200).json({
  success: true,
  message: "Transfer successful",
  transactionId: result.transactionId
});




} catch (err) {
return res.status(500).json({
success: false,
message: err.message || "Transfer failed"
});
}
};