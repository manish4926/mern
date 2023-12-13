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
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }, 
            [this.ROLE_ID] : {
                type: mongoose.Schema.Types.ObjectId, ref: 'Role'
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