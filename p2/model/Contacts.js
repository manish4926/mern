const mongoose = require('mongoose');
const Model = require('../core/Model');
//const SchemaValidator = require('./../core/SchemaValidator');

class Contacts extends Model {

    TABLE = "contacts";

    ID = "_id";
    FIRST_NAME = "first_name";
    LAST_NAME = "last_name";
    EMAIL = "email";
    PHONE = "phone";
    WEBSITE = "website";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";

    constructor() {
        super();
        this.Model = mongoose.model(this.TABLE, this.ContactsSchema);
    }

    ContactsSchema = new mongoose.Schema({
        [this.FIRST_NAME] : {
            type        : String,
            required    : [true, "First Name is Required"],
            trim        : true,
            maxlength   : [40, "First Name does not exceed 40 characters"]
        },
        [this.LAST_NAME] : {
            type        : String,
            required    : [true, "Last Name id Required"],
            trim        : true,
            maxlength   : [40, "Last Name does not exceed 40 characters"]
        },
        [this.EMAIL] : {
            type        : String,
            required    : [true, "Email is Required"],
            trim        : true,
            maxlength   : [40, "Email does not exceed 40 characters"]
        },
        [this.PHONE] : {
            type        : Number,
            required    : [true, "Phone No. is Required"],
            trim        : true,
            maxlength   : [10, "Phone No. does not exceed 10 characters"]
        },
        [this.WEBSITE] : {
            type        : String,
            trim        : true,
            maxlength   : [100, "Website does not exceed 100 characters"]
        }
    });
    
}

const ContactsObj = new Contacts();
module.exports = ContactsObj;