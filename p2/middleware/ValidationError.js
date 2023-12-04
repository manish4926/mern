class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400; // Use the appropriate status code for validation errors
    }
}

module.exports = ValidationError;