const SchemaValidator = require('./SchemaValidator');

class Model {

    constructor() {
        this.SchemaValidator = SchemaValidator;
    }

    paginate(req, params) {
        //create pagination function
    }
}

module.exports = Model;