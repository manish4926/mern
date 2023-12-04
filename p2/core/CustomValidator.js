const ValidatorCore = require('validator');
const ValidationError = require('./../middleware/ValidationError');





class Validator{
    
    constructor() {
        this.message = "";        
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} validator 
     * @desc : used to define variables
     */
    
    make = (req, res, validator) => {
        this.defineVariables(req, res, validator);
        this.getObjectFromArray();
    }

    defineVariables(req, res, validator) {
        this.req = req;
        this.res = res;
        this.validatorArr = validator;
        //console.log(this.validatorArr);
    }

    splitParams = (params) => {
        return params.split('|');
    }

    is_email(key, value) {
        return ValidatorCore.isEmail(value);
    }

    is_string(key,value) {
        if(value && !this.isAlphanumericWithSpace(value)) {
            this.message = `${key} field must not contain special characters.`;
            throw new ValidationError(this.message);

        }
    }

    is_required(key,value) {
        ////if(ValidatorCore.isEmpty(value)) {
        if(!value) {
            this.message = `${key} can not be empty.`;
            throw new ValidationError(this.message);
        }
    }

    is_float(key,value) {
        if(value && this.isFloat(value)) {
            this.message = `${key} can not be empty.`;
        }
    }

    is_integer(key, value) {
        return ValidatorCore.isInt(value);
    }

    is_url(key, value) {
        return ValidatorCore.isUrl(value);
    }

    is_mobile(key, value) {
        return ValidatorCore.isMobilePhone(value);
    }

    isAlphanumericWithSpace(value) {
        // Allow letters, numbers, and white spaces
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(value);
    }

    

    getObjectFromArray = () => {
        //console.log(this.req.body);
        const responseBody = this.req.body;
        //console.log(responseBody['first_name']);

        for(let element in this.validatorArr){
            let indexName = element;
            let requirement = this.validatorArr[element];
            let requirementArr = this.splitParams(requirement);
            
            requirementArr.forEach(filter => {
                if(filter.includes(":")) {
                    //console.log("colon found");
                }
                else {
                    switch(filter) {
                        case 'required':
                            //console.log(element, responseBody[element]);
                            this.is_required(indexName, responseBody[element]);
                        case 'string':
                            this.is_string(indexName, responseBody[element]);
                        default: 
                            //TODO add to log
                            console.log("Validator not found");
                    }
                }
                
            });
        };
    }
}

const ValidatorObj = new Validator();

module.exports = ValidatorObj;