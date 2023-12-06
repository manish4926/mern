const ValidationError = require('./ValidationError');
const Logger = require('./../core/Logger');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({ message: err.message, stackTrace: err.stack});
    } else {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.json({ message: err.message, stackTrace: err.stack});
        if(statusCode != 200 &&  statusCode != 201) {
            const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
            Logger.Logger("Error Log", {status:statusCode,url:url, request:req.body, data: { message: err.message, stackTrace: err.stack}});
        }
    }
    
};

module.exports = errorHandler;