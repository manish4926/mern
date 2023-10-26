const mongoose = require("mongoose");
const TaskManager = require("./../../models/TaskManager");

class TaskController {
  constructor() {
    //this.TaskManagerModel = mongoose.model('TaskManager', new mongoose.Schema({}, { strict: false }));
    this.TaskManager = new TaskManager();
  }

  getTaskList = async (req, res) => {
    // List all tasks
    try {
      const getData = await this.TaskManager.TaskManagerModel.find({});
      console.log(getData);
      if (!getData) {
        // return res.json(200, { msg: "No data found" });
        return res.status(500).json({ msg: "No data found" });
      }
      return res.status(200).json({ getData });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };

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

  getTaskById = (req, res) => {
    // Get Single Task
    res.send("Get Task By Id");
  };

  updateTask = (req, res) => {
    // Update Single Task
    res.send("update task");
  };

  deleteTask = async (req, res) => {
    // Delete Single Task
    let data = req.body;
    try {
      console.log(data);
      const task = await this.TaskManager.TaskManagerModel.deleteOne( data );
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  };
}

const TaskControllerObj = new TaskController();

module.exports = TaskControllerObj;
