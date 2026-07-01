


// controllers/auth.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Account = require("../models/Account");
const emailService = require("../services/email.service");

 /*

POST /api/auth/register

POST [http://localhost:5000/api/auth/register]

Body:
{
"name": "Rahul",
"email": "[rahul@gmail.com](mailto:rahul@gmail.com)",
"password": "123456"
}


*/

exports.register = async (req, res) => {
try {
const { name, email, password } = req.body;


const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists"
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword
});

await emailService.sendRegistrationEmail(user.email, user.name);

const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

await Account.create({
  user: user._id,
  accountNumber,
  balance: 0
});



await emailService.sendRegistrationEmail(
  user.email,
  user.name
);

return res.status(201).json({
  success: true,
  message: "User registered successfully",
  accountNumber
});


} catch (err) {
return res.status(500).json({
success: false,
message: "Registration failed"
});
}
};

 /*

POST /api/auth/login
Body:
{
"email": "[rahul@gmail.com](mailto:rahul@gmail.com)",
"password": "123456"
}
=

*/

exports.login = async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
}

const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

 await emailService.sendLoginEmail(
  user.email,
  user.name
);

return res.status(200).json({
  success: true,
  message: "Login successful",
  token
});


} catch (err) {
return res.status(500).json({
success: false,
message: "Login failed"
});
}
};

exports.changePassword = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Change password API working (not implemented yet)"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error"
    });
  }
};