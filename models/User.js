/*
==========================================================
File: models/User.js

Purpose:
Stores user authentication and personal information.

Used In:
- Authentication
- Account Creation
- Money Transfer

==========================================================
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Full Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email Address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Encrypted Password
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // User Role
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);