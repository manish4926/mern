const express = require('express');
const mongoose = require('mongoose');
const Users = require('./../model/user/Users');
const Roles = require('./../model/user/Roles');
const UserRoles = require('./../model/user/UserRoles');
const Module = require('./Module');

require('dotenv').config();

class User extends Module{
    constructor() {
        super();
    }
    

    createGeneralUser = async (first_name, last_name, user_name, email, mobile, password) => {

        let role = Roles.ROLE_GENERAL;

        try {
            
            let data =  {
                [Users.FIRST_NAME] : first_name,
                [Users.LAST_NAME] : last_name,
                [Users.NAME] : first_name+ " " + last_name,
                [Users.USER_NAME] : user_name,
                [Users.EMAIL] : email,
                [Users.MOBILE] : mobile,
                [Users.STATUS] : Users.STATUS_ACTIVE,
                [Users.ROLE] : role,
                //TOdo Create Authorization Token & Reminder Token (used for cookies)
                //[Users.CREATED_AT]: this.currentDateTime1
            };

            //generate password
            let encryptedPassword = this.Illuminate.generatePassword(password);
            data[Users.PASSWORD] = encryptedPassword;

            const user = await Users.Model.create(data);

            if(user) {
                //if created - create role
                //TODO Insert data in user roles
                const role = await UserRoles.Model.create(data);
            }


            

            return this.success_response(user);

        } catch (error) {
            return this.error_response(500, error);
        }
    }

    createUser = async (first_name, last_name, user_name, email, mobile, password) => {
        
    }

    loginUser = async (username, password) => {
        
        let user = this.checkUserExist(username);
        if (!user) {
            //TODO add to db about user attempt from ip and make an alert
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = this.Illuminate.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        let secretKey = process.env.SECRET_KEY;
        let tokenDuration = (process.env.TOKEN_DURATION) * 60;
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',    //TODO update token duration from ENV
        });

        res.json({ token });
    }

    checkUserExist = async (username) => {
        //TODO check username and mobile and email limit 2
        const user = await Users.Model.findOne(username);

        if (!user) {
            return null;
        }
        return user;

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