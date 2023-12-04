class SchemaValidator{

    constructor() {
        this.result = {};
    }

    name = {
        type: String,
        trim:  true,
        required: [true, "Name is Mandatory"],
        maxlength: [40, "Name can not exceed 40 limit"],
    };

    
    first_name = {
        type: String
    }
    last_name = {
        type: String
    };
    user_name = {
        type: String,
        required: [true, "User Name is Mandatory"],
    }
    email = {
        type: String,
        maxlength: [40, "Email can not exceed 40 limit"],
        required: [true, "Email is Mandatory"],
    }
    mobile =  {
        type: Number,
        maxlength: [10, "Mobile No. can not exceed 10 digits"],
        minlength: [10, "Mobile No. can not less than 10 digits"],
        required: [true, "Mobile No. Mandatory"],
    }
    status = {
        type: Number,
        default: 0
    };
         
    created_at = {
        type: String
    };

    updated_at = {
        type: String
    };

    make = (params)  => {
        //Todo Create funcion
        this.splitParams(params);
        this.getObjectFromArray();
        return this.result;
    }

    splitParams = (params) => {
        this.paramsArr = params.split('|');
    }

    getObjectFromArray = () => {
        this.paramsArr.forEach(element => {
            if (this.hasOwnProperty(element)) {
                //let result = this[element];
                //console.log(result, element);
                this.result = this[element];
            } else {
                // TODO Genrate Log
                console.log(`Property ${element} does not exist in the class.`);
            }
        });
    }
}

const SchemaObj = new SchemaValidator();

module.exports = SchemaObj;
