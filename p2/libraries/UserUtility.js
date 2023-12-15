const express = require('express');
const mongoose = require('mongoose');
const Users = require('../model/user/Users');
const Roles = require('../model/user/Roles');
const UserRoles = require('../model/user/UserRoles');
const Module = require('./Module');

require('dotenv').config();

class UserUtility extends Module{
    constructor() {
        super();
    }
    

    createGeneralUser = async (first_name, last_name, user_name, email, mobile, password) => {

        let role = Roles.ROLE_GENERAL;  
        
        //Check if user exist
        User = Users.checkUserExistByMultiple(user_name, email, mobile);
        if(User) {
            return this.error_response(this.Constants.USER_EXIST, this.Constants.FORBIDDEN_ERROR);
        }

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
        data[Users.PASSWORD] = this.Illuminate.generatePassword(password);

        const User = await Users.Model.create(data);

        if(User) {
            //TODO Insert data in user roles
            let role = Roles.getRoleByName(Roles.ROLE_GENERAL);
            const UserRole = await UserRoles.Model.create({
                [UserRoles.USER_ID] : User[Users.ID],
                [UserRoles.ROLE_ID] : role.id,
            });
        }
        
        //TODO create login data in Core/Auth and send it to response
        return this.success_response("User registered successfully");
    }



    createUser = async (first_name, last_name, user_name, email, mobile, password) => {
        
    }

    loginUser = async (username, password) => {
        
        let user = await this.checkUserExist(username);
        if (!user) {
            //TODO add to db about user attempt from ip and make an alert
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = this.Illuminate.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if(!user || await this.Illuminate.comparePassword(password, user.password) == false) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        let secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
        let tokenDuration = (process.env.ACCESS_TOKEN_DURATION) * 60;
        const accessToken = jwt.sign({ 
            userId: user[Users.ID],
            email: user[Users.EMAIL], 
            username: user[Users.USER_NAME], 
        }, secretKey, {
            expiresIn: '1h',    //TODO update token duration from ENV
        });

        res.json({ accessToken });
    }

    
}

module.exports = new UserUtility();