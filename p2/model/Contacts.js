const mongoose = require('mongoose');

class Contacts {

    TABLE = "contacts";

    ID = "_id";
    FIRST_NAME = "first_name";
    LAST_NAME = "last_name";
    EMAIL = "email";
    PHONE = "phone";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";

    constructor() {
        this.ContactsSchema = new mongoose.Schema({
            [this.FIRST_NAME] : {
                type        : String,
                required    : [true, "Validation Message"],
                trim        : true,
                maxlength   : [40, "Limit message"]
            },
            [this.LAST_NAME] : {
                type        : String,
                required    : [true, "Validation Message"],
                trim        : true,
                maxlength   : [40, "Limit message"]
            },
            [this.EMAIL] : {
                type        : String,
                required    : [true, "Validation Message"],
                trim        : true,
                maxlength   : [40, "Limit message"]
            },
            [this.PHONE] : {
                type        : Number,
                required    : [true, "Validation Message"],
                trim        : true,
                maxlength   : [10, "Limit message"]
            }
        });

        this.ContactsModel = mongoose.model(this.TABLE, this.ContactsSchema);
    }
    
}

const ContactsObj = new Contacts();
module.exports = ContactsObj;