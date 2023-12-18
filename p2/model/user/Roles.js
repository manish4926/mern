const mongoose = require('mongoose');
const SchemaValidator = require('../../core/SchemaValidator');
const Model = require('../../core/Model');

class Roles extends Model {
    TABLE = "roles";

    //object variables
    ID = "_id";
    NAME = "name";
    DESCRIPTION = "description";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";

    ROLE_GENERAL        = "GENERAL";
    ROLE_ADMIN          = "ADMIN";
    ROLE_SUPER_ADMIN    = "SUPER_ADMIN";
    
    constructor() {
        //Create Schema
        super();
        if(!this.Model) {
            this.Model = mongoose.model(this.TABLE, this.Schema);
        }
    }

    Schema = new mongoose.Schema({
        [this.NAME] : {
            type: String,
            trim:  true,
            required: [true, "Name is Mandatory"],
            maxlength: [40, "Name can not exceed 40 limit"],
        }, 
        [this.DESCRIPTION] : {
            type: String,
            trim:  true
        }
    }, {
        timestamps:  true
    })

    //TODO complete this

    getRoleByName(name) {
        console.log('test');
        //return this.Model.findOne((role) => role.name === name);
        return this.Model.findOne({ [this.NAME] : name});
    }
    
    getRoles() {
        return this.Model.find({});
    }
}

module.exports = new Roles();