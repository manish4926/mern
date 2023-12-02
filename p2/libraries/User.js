const express = require('express');
const mongoose = require('mongoose');
const Users = require('./../model/user/Users');
const Module = require('./Module');

class User extends Module{
    constructor() {
        super();
        
    }
    

    createGeneralUser = async (first_name, last_name, user_name, email, mobile, password) => {
        try {
            
            
            let data =  {
                [Users.FIRST_NAME] : first_name,
                [Users.LAST_NAME] : last_name,
                [Users.NAME] : first_name+ " " + last_name,
                [Users.USER_NAME] : user_name,
                [Users.EMAIL] : email,
                [Users.MOBILE] : mobile,
                [Users.PASSWORD] : password,
                [Users.STATUS] : Users.STATUS_ACTIVE
                //TOdo Create Authorization Token & Reminder Token (used for cookies)
                //[Users.CREATED_AT]: this.currentDateTime1
            };

            const user = Users.Model.create(data);

            //if created - create role

            return this.success_response(data);

        } catch (error) {
            return this.error_response(500, error);
        }
    }

    checkUserExist = async (username, mobile, email) => {
        //check username and mobile and email limit 2
        return true;
    }

    checkUserByMobile = async (mobile) => {
        return true;
    }

    checkUserByUserName = async (username) => {
        return true;
    }
}

// const UserLib = new User();


module.exports = new User();