/*
==========================================================
File: utils/ApiResponse.js

Purpose:
Standard API Response Format

==========================================================
*/

class ApiResponse {

    constructor(statusCode, message, data = null) {

        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

    }

}

module.exports = ApiResponse;