const mongoose = require('mongoose');
const SchemaValidator = require('../../core/SchemaValidator');

class Permissions {

    TABLE = "permissions";
    
    ID = "_id";
    NAME = "name";
    DESCRIPTION = "description";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    
    constructor() {
        this.Model = mongoose.Schema(this.Model, this.Schema);
    }

    //Create Schema
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
        },
        [this.CREATED_AT]: {
            type: DateTime
        },
        [this.UPDATED_AT]: {
            type: DateTime
        }
    })
}


module.exports = new Permissions();