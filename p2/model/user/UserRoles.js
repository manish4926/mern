const mongoose = require('mongoose');

class UserRoles {

    //object variables
    ID = "id";
    USER_ID = "user_id";
    ROLE_ID = "role_id";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    
    constructor() {
        //Create Schema
        this.UserRoleSchema = new mongoose.Schema({
            [this.USER_ID] : {
                type: Int,
                required: [true, "User ID is Mandatory"]
            }, 
            [this.ROLE_ID] : {
                type: Int32,
                required: [true, "Role ID is Mandatory"]
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