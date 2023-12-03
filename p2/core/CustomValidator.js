
class Validation {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} validator 
     * @desc : used to define variables
     */
    make = (req, res, validator) => {
        defineVariables(req, res, validator);
        
        
    }

    defineVariables(req, res, validator) {
        this.req = req;
        this.res = res;
        this.validator = validator;
    }
}

module.exports = Validation;