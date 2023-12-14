const mongoose = require('mongoose');

class UserRoles {

    TABLE = "user_roles";

    //object variables
    ID = "_id";
    USER_ID = "user_id";
    ROLE_ID = "role_id";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    
    constructor() {

        this.Model = mongoose.model(this.TABLE, this.Schema);
        
    }

    //Create Schema
    Schema = new mongoose.Schema({
        [this.USER_ID] : {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }, 
        [this.ROLE_ID] : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Role'
        }
    })
}


module.exports = new UserRoles();