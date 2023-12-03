const Constants = require('./../constants');
//const Validator = require('validator');
const Validation = require('./../core/CustomValidator');

class Controller {
    constructor() {
        this.Constants = Constants;
        this.Validator = Validator;
    }

    success_response = (req, res, data, msg="") => {
        return res.status(200).json({"data":data});
    }

    msg_response = (req, res, msg) => {
        return res.status(401).json({"msg":msg});
    }

    validation_response = (req, res, msg) => {
        return res.status(400).json({"msg":msg});
    }

    error_response = (req, res, msg, errCode) => {
        return res.status(errCode).json({"msg":msg});
    }

    validator = Validation;
    
}

//const ControllerCls = new Controller();

module.exports = Controller;