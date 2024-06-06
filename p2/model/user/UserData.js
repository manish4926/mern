const mongoose = require('mongoose');

class UserData {

    TABLE = "user_data";

    //object variables
    ID = "_id";
    USER_ID = "user_id";
    TITLE = "title";
    DATA = "data";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";


    DATA_NAME_WEALTH_AMOUNT = "WEALTH_AMOUNT";
    
    constructor() {
        this.Model = mongoose.model(this.TABLE, this.Schema);        
    }

    //Create Schema
    Schema = new mongoose.Schema({
        [this.USER_ID] : {
            type: String,
            required: [true, "User ID is Mandatory"]
        }, 
        [this.TITLE] : {
            type: String,
            required: [true, "Title is Required"]
        },
        [this.DATA] : {
            type: String,
            required: [true, "Data is Required"]
        }
    }, {
        timestamps: true
    })

    getDataByTitle = async (userID, title) => {
        try {
            const userData = await this.Model.find({
                user_id: userID,
                title: title
            });
            return userData; // Return the user object instead of true
        } catch (error) {
            console.error("Error finding user data by title:", error);
            throw error; // Rethrow the error after logging it
        }
    }
}

module.exports = new UserData();