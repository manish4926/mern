const ValidationError = require('./ValidationError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({ message: err.message, stackTrace: err.stack});
    } else {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.json({ message: err.message, stackTrace: err.stack});
    }
    
};

module.exports = errorHandler;