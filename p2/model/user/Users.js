const mongoose = require('mongoose');

class Users {

    TABLE = "users";

    //create object variable
    ID  = "_id";
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

    EMAIL_LIMIT = 2;
    

    constructor() {
        //create schema
        this.Schema = new mongoose.Schema({
            [this.NAME]: {
                type: String,
                trim:  true,
                required: [true, "Name is Mandatory"],
                maxlength: [40, "Name can not exceed 40 limit"],
            } ,
            [this.FIRST_NAME] : {
                type: String
            },
            [this.LAST_NAME] : {
                type: String
            },
            [this.USER_NAME] : {
                type: String,
                required: [true, "User Name is Mandatory"],
            },
            [this.EMAIL] : {
                type: String,
                maxlength: [40, "Email can not exceed 40 limit"],
                required: [true, "Email is Mandatory"],
            },
            [this.MOBILE] : {
                type: Number,
                maxlength: [10, "Mobile No. can not exceed 10 digits"],
                minlength: [10, "Mobile No. can not less than 10 digits"],
                required: [true, "Mobile No. Mandatory"],
            },
            [this.STATUS]: {
                type: Number,
                default: 0
            },

            // [this.CREATED_AT]: {
            //     type: Da
            // },
            // [this.UPDATED_AT]: {
            //     type: DateTime
            // }
        }, {
            timestamps: true
        })

        this.Model = mongoose.model(this.TABLE, this.Schema);
    }
}

//const UsersSchema = mongoose.model(this.TABLE, new mongoose.Schema({}, {strict:false}));
const UsersModel = new Users();

module.exports = UsersModel;