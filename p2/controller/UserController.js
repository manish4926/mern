
const { response } = require('express');
const UserLib = require('./../libraries/User');

const Controller = require('./Controller');

class UserController extends Controller {

    constructor() {
        super();
    }
    
    createNewUser = async (req, res) => {
        //Check for validations
        let validator = {
            'first_name'    : 'string|maxlength:40',
            'last_name'     : 'string|maxlength:40',
            'user_name'     : 'string|maxlength:40',
            'email'         : 'email|maxlength:40',
            'mobile'        : 'mobile',
            'password'      : 'string|maxlength:40',
        }
        if (validator.fails()) {
            //return validation error
			//return $this->returnValidationErrors($Validator, 'Invalid data');
		}
        //Check if user exist
        //register user
        

        let response = await UserLib.createGeneralUser(req.body.first_name, req.body.last_name, req.body.user_name, req.body.email, req.body.mobile, req.body.password);
    
        return res.status(response.status).json(response.data);
    }

    getUsers = (req, res) => {
        console.log(res);
        return res.status(200).json({ "test":'response 1' });
    }
}

const UserControllerObj  = new UserController();
module.exports = UserControllerObj;