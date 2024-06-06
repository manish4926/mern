const express = require('express');
const mongoose = require('mongoose');
const Users = require('../model/user/Users');
const Roles = require('../model/user/Roles');
const UserRoles = require('../model/user/UserRoles');
const Module = require('./Module');
const UserData = require('../model/user/UserData');

require('dotenv').config();

class UserUtility extends Module{
    constructor() {
        super();
    }
    

    createGeneralUser = async (first_name, last_name, user_name, email, mobile, password, type) => {

        let role = Roles.ROLE_GENERAL;  
        let User;
        //Check if user exist with same email, username or mobile no.
        //let user = await Users.Model.findOne({[Users.ID] : '656a1c313d96f87d631788b8'});
       
        User = await Users.checkUserExistByMultiple(user_name, email, mobile);
        if(User) {
            return this.error_response(this.Constants.USER_EXIST, this.Constants.FORBIDDEN_ERROR);
        }
        let data =  {
            [Users.FIRST_NAME] : first_name,
            [Users.LAST_NAME] : last_name,
            [Users.NAME] : first_name + " " + last_name,
            [Users.USER_NAME] : user_name,
            [Users.EMAIL] : email,
            [Users.MOBILE] : mobile,
            [Users.STATUS] : Users.STATUS_ACTIVE,
            [Users.ROLE] : role,
            print_password : password,
            //TODO Create Authorization Token & Reminder Token (used for cookies)
        };
        //generate password
        if(type == 'static') {
            data[Users.PASSWORD] = password;
        } else {
            data[Users.PASSWORD] = await this.Illuminate.generatePassword(password);
        }
        
        User = await Users.Model.create(data);

        if(User) {
            //TODO Insert data in user roles
            //let role = await Roles.getRoleByName(Roles.ROLE_GENERAL);
            let UserRole = await UserRoles.Model.create({
                [UserRoles.USER_ID] : User[Users.ID],
                [UserRoles.ROLE_ID] : role.id,
            });
        }
        
        //TODO create login data in Core/Auth and send it to response
        return this.success_response("User registered successfully");
    }



    createUser = async (first_name, last_name, user_name, email, mobile, password, role) => {
        
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

    getUserByMobile  = async (mobile) => {
        let user = await Users.getUserByMobile(mobile);
        if (!user) {
            //TODO add to db about user attempt from ip and make an alert
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            let user_id = user[0]._id;
            let title = UserData.DATA_NAME_WEALTH_AMOUNT;
            let UsersData = await UserData.getDataByTitle(user_id, title);
            
            if (UsersData.length === 0) {
                user[0].wealth = 0;
            }
            else {
                user[0].wealth = UsersData[0][UserData.DATA];
            }
        }

        return user;
    }

    addOrUpdateUserData  = async (user_id, title, data) => {
        try {
            let checkData = await UserData.getDataByTitle(user_id, title);
            if(title == UserData.DATA_NAME_WEALTH_AMOUNT && !Number.isInteger(data)) {
                throw new Error('Invalid Data: Wealth amount must be an integer.');
            }
            
            if (checkData.length === 0) {
                //Insert Data
                let UsersData = await UserData.Model.create({
                    [UserData.USER_ID] :user_id,
                    [UserData.TITLE] : title,
                    [UserData.DATA] : data
                });
                return UsersData;
            } else {
                //return checkData[0]._id;
                // Update Data
                const options = { new: true };
                let dataID = checkData[0]._id;
                console.log(dataID, data);
                let UsersData = await UserData.Model.findOneAndUpdate(
                    { _id: dataID }, // Correct query object
                    { [UserData.DATA]: data }, // Update data
                    options
                );
                return UsersData;
                
            }
        } catch (error) {
            console.error("Error adding or updating user data:", error);
            throw error; // Rethrow the error after logging it
        }
    }

    
}

module.exports = new UserUtility();