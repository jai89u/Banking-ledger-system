/*
==========================================================
File: middleware/error.middleware.js

Purpose:
Global Error Handler

This middleware catches all application errors
and sends a standard JSON response.

==========================================================
*/

const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

};

module.exports = errorMiddleware;