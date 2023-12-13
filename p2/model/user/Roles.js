const mongoose = require('mongoose');
const SchemaValidator = require('../../core/SchemaValidator');

class Roles {

    //object variables
    ID = "id";
    NAME = "name";
    DESCRIPTION = "description";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";

    ROLE_GENERAL        = "GENERAL";
    ROLE_ADMIN          = "ADMIN";
    ROLE_SUPER_ADMIN    = "SUPER_ADMIN";
    
    constructor() {
        //Create Schema
        this.RoleSchema = new mongoose.Schema({
            [this.NAME] : {
                type: String,
                trim:  true,
                required: [true, "Name is Mandatory"],
                maxlength: [40, "Name can not exceed 40 limit"],
            }, 
            [this.DESCRIPTION] : {
                type: String,
                trim:  true
            },
            [this.CREATED_AT]: {
                type: DateTime
            },
            [this.UPDATED_AT]: {
                type: DateTime
            }
        })
    }

    //TODO complete this

    // getRoleByName(name) {
    //     return this.roles.find((role) => role.name === name);
    //   }
    
    //   getRoles() {
    //     return this.roles;
    //   }
}