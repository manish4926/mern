const mongoose = require("mongoose");
const TaskManager = require("./../../models/TaskManager");

class TaskController {
  constructor() {
    //this.TaskManagerModel = mongoose.model('TaskManager', new mongoose.Schema({}, { strict: false }));
    this.TaskManager = new TaskManager();
  }

  getTaskList = asyncWrapper(async (req, res) => {
    // List all tasks
    
      const getData = await this.TaskManager.TaskManagerModel.find({});
      console.log(getData);
      if (!getData) {
        // return res.json(200, { msg: "No data found" });
        return res.status(500).json({ msg: "No data found" });
      }
      return res.status(200).json({ getData });
  });

  createTask = async (req, res) => {
    // Create new task
    let data = req.body;
    try {
      console.log(data);
      const task = await this.TaskManager.TaskManagerModel.create( data );
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };

  getTaskById = async (req, res) => {
    // Get Single Task
    let {id:TaskId} = req.params;
    try {
      const task = await this.TaskManager.TaskManagerModel.findOne({_id: TaskId});
      if(!task) {
        return res.status(404).json({ msg: "Task not found" });  
      }
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };

  updateTask = async (req, res) => {
    // Update Single Task
    let {id:TaskId} = req.params;
    let data = req.body;
    try {
      const task = await this.TaskManager.TaskManagerModel.findOneAndUpdate( {_id: TaskId}, data );
      if(!task) {
        return res.status(404).json({ msg: `Invalid Task Id ${TaskId }` });  
      }
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };

  deleteTask = async (req, res) => {
    // Delete Single Task
    let {id:TaskId} = req.params;
    try {
      const task = await this.TaskManager.TaskManagerModel.findOneAndDelete( {_id: TaskId} );
      if(!task) {
        return res.status(404).json({ msg: `Invalid Task Id ${TaskId }` });  
      }
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };
}

const TaskControllerObj = new TaskController();

module.exports = TaskControllerObj;
