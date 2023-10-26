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
        this.TaskManagerSchema = new mongoose.Schema({ name: String });
        this.TaskManagerModel = mongoose.model('task_manager', this.TaskManagerSchema);


     }
}

module.exports = TaskManager;
