const mongoose = require('mongoose');

class TaskManager {
    //create object variable
    TABLE = "task_manager";

    ID = "_id";
    TITLE = "title";
    DESCRIPTION = "description";
    IS_COMPLETED = "is_completed";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";

    //create schema in constructor (so that it will be called automatically)
    constructor() {
        this.TaskManagerSchema =  new mongoose.Schema ({
            name: {
                type : String,
                required : [true, "Please fill name / title"],
                trim: true,
                maxlength: [20, "Title can not be greater than 20 characters"]
            },
            is_completed: {
                type : Boolean,
                default : false
            }
        })
        this.TaskManagerModel = mongoose.model(this.TABLE, this.TaskManagerSchema);
    }
}

module.exports = TaskManager;