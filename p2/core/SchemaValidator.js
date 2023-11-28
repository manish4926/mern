class SchemaValidator{
    name = {
        type: String,
        trim:  true,
        required: [true, "Name is Mandatory"],
        maxlength: [40, "Name can not exceed 40 limit"],
    };

    created_at = {
        type: DateTime
    };
    
    updated_at = {
        type: DateTime
    };


    toMergeMultipleValidators = (arrayparams)  => {
        //Todo Create funcion
    }
}

const SchemaObj = new Schema();

module.exports = SchemaObj;
