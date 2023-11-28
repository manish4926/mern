const mongoose = require('mongoose');

class UserPermission {

    //object variables
    ID = "id";
    USER_ID = "user_id";
    PERMISSION_ID = "permission_id";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    
    constructor() {
        //Create Schema
        this.UserPermissionSchema = new mongoose.Schema({
            [this.USER_ID] : {
                type: Int32,
                required: [true, "User ID is Mandatory"]
            }, 
            [this.ROLE_ID] : {
                type: Int32,
                required: [true, "Permission ID is Mandatory"]
            },
            [this.CREATED_AT]: {
                type: DateTime
            },
            [this.UPDATED_AT]: {
                type: DateTime
            }
        })
    }
}