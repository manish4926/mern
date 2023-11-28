const mongoose = require('mongoose');

class Users {
    //create object variable
    ID  = "id";
    NAME = "name";
    FIRST_NAME = "first_name";
    LAST_NAME = "last_name";
    USER_NAME = "user_name";
    EMAIL = "email";
    MOBILE = "mobile";
    PASSWORD = "password";
    STATUS = "status";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";


    //do not create access token and remember token
    

    //STATUS  OPTIONS

    STATUS_INACTIVE = 0;
    STATUS_ACTIVE = 1;
    STATUS_TEMPORARY_BLOCKED = 2;
    STATUS_PERMANENT_BLOCKED = 3;


    LABEL_STATUS_INACTIVE = "INACTIVE";
    LABEL_STATUS_ACTIVE = "ACTIVE";

    LABEL_STATUS_TEMPORARY_BLOCKED = "TEMPORARY_BLOCKED";
    LABEL_STATUS_PERMANENT_BLOCKED = "PERMANENT_BLOCKED";
    

    constructor() {
        //create schema
        this.UserSchema = new mongoose.Schema({
            name: {
                type: String,
                trim:  true,
                required: [true, "Name is Mandatory"],
                maxlength: [40, "Name can not exceed 40 limit"],
            } ,
            first_name : {
                type: String
            },
            last_name : {
                type: String
            },
            username : {
                type: String,
                required: [true, "User Name is Mandatory"],
            },
            email : {
                type: String,
                maxlength: [40, "Email can not exceed 40 limit"],
                required: [true, "Name is Mandatory"],
            },
            mobile : {
                type: String,
                maxlength: [10, "Email can not exceed 10 limit"],
                minlength: [10, "Email can not exceed 10 limit"],
                required: [true, "Name is Mandatory"],
            },
            status: {
                type: Int32Array,
                default: 0
            },
            created_at: {
                type: DateTime
            },
            updated_at: {
                type: DateTime
            }
        })
    }
}