const { testMiddleWare } = require('./web/Auth');


const webGroup = (req, res, next) => {
    
    // TODO Check permission
    // TODO Check Auth Token
    // TODO Check device token
    // TODO Cors
    // TODO Check for secret key if login not required
    //testMiddleWare(req, res, next);
    //next();
    return next;
}


const webAuthGroup = (req, res, next) => {

    this.web();
    // TODO Check permission
    // TODO Check Auth Token
    // TODO Call for Check Role

    next();
}



//module.exports = { authenticateToken, authorizeRole, testMiddleWare };
module.exports = {webGroup, webAuthGroup};