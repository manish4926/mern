
const express  = require('express');
const UserUtility = require('./../libraries/UserUtility');
const asyncHandler = require('express-async-handler');
const Controller = require('./Controller');

class UserController extends Controller {

    constructor() {
        super();
    }
    
    createNewUser = asyncHandler(async (req, res) => {
        //Check for validations
        let validation = {
            'first_name'    : 'required|string|maxlength:40',
            'last_name'     : 'required|string|maxlength:40',
            'user_name'     : 'required|string|maxlength:40',
            'type'          : 'required|email|maxlength:40',
            'email'         : 'required|email|maxlength:40',
            'mobile'        : 'required|mobile',
            'password'      : 'required|string|maxlength:40',
        }
        this.Validator.make(req, res, validation);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}

        
        //register user
        let response = await UserUtility.createGeneralUser(req.body.first_name, req.body.last_name, req.body.user_name, req.body.email, req.body.mobile, req.body.password, req.body.type);
        return res.status(response.status).json(response);
    })

    loginUser = asyncHandler(async(req, res) => {
        let validator = {
            'username'    : 'string|maxlength:40',
            'password'     : 'string|maxlength:40'
        }

        this.Validator.make(req, res, validation);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}

        let response = await UserUtility.loginUser(req.body.user_name, req.body.password);
    })

    forgotPassword = asyncHandler(async (req,res) => {
        //TODO user functions
        return res.status(200).json({ "test":'response 1' });
    })

    changePassword = asyncHandler(async (req,res) => {
        //TODO user functions
        return res.status(200).json({ "test":'response 1' });
    })

    getUser = asyncHandler( async(req, res) => {
        console.log(res);
        return res.status(200).json({ "test":'response 1' });
    })

    getUserByMobile = asyncHandler( async(req, res) => {
        let validator = {
            'mobile'    : 'required|maxlength:10'
        }

        this.Validator.make(req, res, validator);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}

        let response = await UserUtility.getUserByMobile(req.body.mobile);
        return res.status(200).json(response);
    })

    addOrUpdateUserData = asyncHandler( async(req, res) => {
        let validator = {
            'user_id'    : 'required',
            'title'      : 'required',
            'data'       : 'required',
        }

        this.Validator.make(req, res, validator);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}

        let response = await UserUtility.addOrUpdateUserData(req.body.user_id, req.body.title, req.body.data);
        return res.status(200).json(response);
    })

    
    
}

module.exports = new UserController();