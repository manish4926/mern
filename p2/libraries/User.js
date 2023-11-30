const express = require('express');
const mongoose = require('mongoose');
const Users = require('./../model/user/Users');

class User {
    // constructor() {
    //     var datetime = new Date();
    //     let newdate = datetime.getDate+" "+datetime.getTime;
    //     console.log(newdate);
    // }
    

    createGeneralUser = async (first_name, last_name, user_name, email, mobile, password) => {
        // ToDo: Encrypt Password
        var datetime = new Date();
        try {
            let data =  {
                [Users.FIRST_NAME] : first_name,
                [Users.LAST_NAME] : last_name,
                [Users.USER_NAME] : user_name,
                [Users.EMAIL] : email,
                [Users.MOBILE] : mobile,
                [Users.PASSWORD] : password,
                [Users.STATUS] : Users.LABEL_STATUS_ACTIVE
                //[Users.CREATED_AT]: datetime.getDate+" "+datetime.getTime 
            };

        } catch (error) {
            return res.status(500).json({'msg': error });
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