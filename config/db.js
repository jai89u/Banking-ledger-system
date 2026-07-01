/*
==========================================================
File: config/db.js

Purpose:
Connects the application to MongoDB Atlas.

Used In:
server.js

==========================================================
*/

const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.DATABASE_URL);

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log("MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);

    }
};

module.exports = connectDB;