const SchemaValidator = require('./SchemaValidator');

class Model {

    constructor() {
        this.SchemaValidator = SchemaValidator;
    }

    paginate(req) {
        //create pagination function
    }
}

module.exports = Model;