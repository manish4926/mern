const ConstantsLib = require("../constants");


class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = ConstantsLib.VALIDATION_ERROR; // Use the appropriate status code for validation errors
    }
}

module.exports = ValidationError;