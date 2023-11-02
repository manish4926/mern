const mongoose = require('mongoose');

class TaskManager {
    TABLE_NAME = "task_manager";

    ID = "_id";
    TITLE = "title";
    DESCRIPTION = "description";
    IS_COMPLETED = "is_completed";
    CREATED_AT = "created_at";
    UPDATED_AT = "updated_at";
    

    constructor() {
        this.TaskManagerSchema = new mongoose.Schema({ 
            name: {
                type : String,
                required: [true, "Validation Message"],
                trim: true,
                maxlength: [20, "name can not be greater than 20 chars."]
            } ,
            is_completed: {
                type: Boolean,
                default: false
            }
        });
        this.TaskManagerModel = mongoose.model('task_manager', this.TaskManagerSchema);


     }
}

module.exports = TaskManager;
