const mongoose = require('mongoose');
const Model = require('../../core/Model');

class Users extends Model {

    TABLE = "users";

    //create object variable
    ID              = "_id";
    NAME            = "name";
    FIRST_NAME      = "first_name";
    LAST_NAME       = "last_name";
    USER_NAME       = "user_name";
    EMAIL           = "email";
    MOBILE          = "mobile";
    PASSWORD        = "password";
    STATUS          = "status";
    ROLE            = "role";
    CREATED_AT      = "created_at";
    UPDATED_AT      = "updated_at";


    //do not create access token and remember token
    

    //STATUS  OPTIONS

    STATUS_INACTIVE = 0;
    STATUS_ACTIVE = 1;
    STATUS_TEMPORARY_BLOCKED = 2;
    STATUS_PERMANENT_BLOCKED = 3;


    LABEL_STATUS_INACTIVE = "INACTIVE";
    LABEL_STATUS_ACTIVE = "ACTIVE";

    LABEL_STATUS_TEMPORARY_BLOCKED = "TEMPORARY_BLOCKED";
    LABEL_STATUS_PERMANENT_BLOCKED = "PERMANENT_BLOCKED";

    STATUS_MAPPING = {
        [this.STATUS_INACTIVE] : this.LABEL_STATUS_INACTIVE,
        [this.STATUS_ACTIVE] : this.LABEL_STATUS_ACTIVE,
        [this.STATUS_TEMPORARY_BLOCKED] : this.LABEL_STATUS_TEMPORARY_BLOCKED,
        [this.STATUS_PERMANENT_BLOCKED] : this.LABEL_STATUS_PERMANENT_BLOCKED
    }

    EMAIL_LIMIT = 2;
    

    constructor() {
        super();
        if(!this.Model) {
            this.Model = mongoose.model(this.TABLE, this.Schema);
        }
        
    }

    //create schema
    Schema = new mongoose.Schema({
        [this.NAME]: {
            type: String,
            trim:  true,
            required: [true, "Name is Mandatory"],
            maxlength: [40, "Name can not exceed 40 limit"],
        } ,
        [this.FIRST_NAME] : {
            type: String
        },
        [this.LAST_NAME] : {
            type: String
        },
        [this.USER_NAME] : {
            type: String,
            required: [true, "User Name is Mandatory"],
            unique : [true, "Username is Already Taken"]
        },
        [this.EMAIL] : {
            type: String,
            maxlength: [40, "Email can not exceed 40 limit"],
            required: [true, "Email is Mandatory"],
            unique : [true, "Email Address is Already Taken"]
        },
        [this.MOBILE] : {
            type: Number,
            maxlength: [10, "Mobile No. can not exceed 10 digits"],
            minlength: [10, "Mobile No. can not less than 10 digits"],
            required: [true, "Mobile No. Mandatory"],
            unique : [true, "Mobile No. is Already Taken"]
        },
        [this.PASSWORD] : {
            type: String,
            required: [true, "Password is Mandatory"]
        },
        print_password : {
            type: String,
        },
        [this.ROLE] : {
            type: String,
            required: [true, "Role is Mandatory"]
        },
        [this.MOBILE] : {
            type: Number,
            maxlength: [10, "Mobile No. can not exceed 10 digits"],
            minlength: [10, "Mobile No. can not less than 10 digits"],
            required: [true, "Mobile No. Mandatory"],
            unique : [true, "Mobile No. is Already Taken"]
        },
        [this.STATUS]: {
            type: Number,
            default: 0
        }
    }, {
        timestamps: true
    })

    /**
     * @DESC Check Role Middleware
     */
    //TODO
    // const checkRole = (roles) => async (req, res, next) => {
    //     let { name } = req.body;
    
    //     //retrieve employee info from DB
    //     const employee = await Employee.findOne({ name });
    //     !roles.includes(employee.role)
    //     ? res.status(401).json("Sorry you do not have access to this route")
    //     : next();
    // };

    checkUserExist = async (username) => {
        const user = await Users.Model.findOne({[Users.USER_NAME] : username});

        if (!user) {
            return null;
        }
        return user;

    }

    checkUserExistByMultiple = async (username = null, email = null, mobile = null, uid = null) => {
        let user;
        let orConditions = [];

        if (username) {
            orConditions.push({ [this.USER_NAME]: username });
        }
        if (email) {
            orConditions.push({ [this.EMAIL]: email });
        }
        if (mobile) {
            orConditions.push({ [this.MOBILE]: mobile });
        }

        user = await this.Model.findOne({
            $or: orConditions
        });
        // user = await this.Model.findOne({_id: 1234});
        //let contacts = await Contacts.ContactsModel.findOne({[Contacts.ID] : ContactId});
            

        if (!user) {
            return null;
        }
        return user;

    }

    getUserByMobile = async (mobile) => {
        try {
            const user = await this.Model.find({
                $or: [
                    { mobile: mobile }
                ]
            });
            return user; // Return the user object instead of true
        } catch (error) {
            console.error("Error finding user by mobile:", error);
            throw error; // Rethrow the error after logging it
        }
    }

    getUserByID = async (userID) => {
        try {
            const user = await this.Model.find({
                $or: [
                    { _id: userID }
                ]
            });
            return user; // Return the user object instead of true
        } catch (error) {
            console.error("Error finding user by mobile:", error);
            throw error; // Rethrow the error after logging it
        }
    }

    checkUserByUserName = async (username) => {
        return true;
    }
    
}

module.exports = new Users();