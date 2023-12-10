const ValidationError = require('./ValidationError');
const Logger = require('./../core/Logger');
const Constants = require('../constants');

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : Constants.SERVER_ERROR;

    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({title: 'ValidationError', message: err.message, stackTrace: err.stack});
    } 
    if (err instanceof ReferenceError || err instanceof SyntaxError) {
        res.statusCode = Constants.SERVER_ERROR;
        statusCode = Constants.SERVER_ERROR;
    } 
    
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

    if(statusCode != 200 &&  statusCode != 201) {
        switch(statusCode) {
            case Constants.VALIDATION_ERROR:
                res.json ({
                    title: "Validation Error",
                    message : err.message,
                    stackTrace: err.stack
                });
                break;
            case Constants.NOT_FOUND_ERROR:
                res.json ({
                    title: "Request Not Found in Error Handleer",
                    message : err.message+' Invalid Url! Page you entered might not exist or deleted',
                    stackTrace: err.stack
                });
                break;
            case Constants.UNAUTHORIZED_ERROR:
                res.json ({
                    title: "Unauthorized Access",
                    message : err.message,
                    stackTrace: err.stack
                });
                Logger.Logger("Unauthorized Access Error Log", {data: { status:statusCode,url:url.href, request:req.body, message: err.message, stackTrace: err.stack}});
                //TODO trace the ip address and attemps to block it
                break;
            case Constants.FORBIDDEN_ERROR:
                res.json ({
                    title: "Forbidden Error",
                    message : err.message,
                    stackTrace: err.stack
                });
                Logger.Logger("Forbidden Error Log", {data: { status:statusCode,url:url.href, request:req.body, message: err.message, stackTrace: err.stack}});
                break;
            case Constants.SERVER_ERROR:
                res.json ({
                    title: "Internal System Error",
                    message : err.message,
                    stackTrace: err.stack
                });
                Logger.Logger("Server Error Log", {data: { status:statusCode,url:url.href, request:req.body, message: err.message, stackTrace: err.stack}});
                break;
        }
        
        
    }
    
    
};

module.exports = errorHandler;