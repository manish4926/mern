const mongoose = require('mongoose');

class UserPermission {

    TABLE = "user_permissions";

    //object variables
    ID = "_id";
    USER_ID = "user_id";
    PERMISSION_ID = "permission_id";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    
    constructor() {
        this.Model = mongoose.model(this.TABLE, this.Schema);        
    }

    //Create Schema
    Schema = new mongoose.Schema({
        [this.USER_ID] : {
            type: Int32,
            required: [true, "User ID is Mandatory"]
        }, 
        [this.ROLE_ID] : {
            type: Int32,
            required: [true, "Permission ID is Mandatory"]
        },
        [this.CREATED_AT]: {
            type: DATE
        },
        [this.UPDATED_AT]: {
            type: DATE
        }
    })
}

module.exports = new UserPermission();