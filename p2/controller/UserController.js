const express = require('express');
const UserLib = require('./../libraries/User');

class UserController {

    constructor() {
    }
    
    createNewUser = (req, res) => {
        //Check for validations
        //Check if user exist
        //register user
console.log("hhfej");
        //return UserLib.createGeneralUser(res.body.first_name, res.body.last_name, res.body.user_name, res.body.email, res.body.mobile, res.body.password);
        
        return res.status(200).json({ "test":'response 1' });
        
    }

    getUsers = (req, res) => {
        console.log(res);
        return res.status(200).json({ "test":'response 1' });
    }
}

const UserControllerObj  = new UserController();
module.exports = UserControllerObj;