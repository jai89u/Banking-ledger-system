/*
==========================================================
File: utils/asyncHandler.js

Purpose:
Removes try-catch from every controller.

==========================================================
*/

const asyncHandler = (requestHandler) => {

    return (req, res, next) => {

        Promise.resolve(requestHandler(req, res, next))
            .catch(next);

    };

};

module.exports = asyncHandler;