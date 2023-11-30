const mongoose      = require("mongoose");
const TaskManager   = require("./../model/TaskManager");
const Constants = require('./../constants');


class TaskController{
    constructor() {
        //super();
        this.TaskManagerModel = mongoose.model('TaskManager', new mongoose.Schema({}, { strict: false }));
        this.TaskManager = new TaskManager();
        //this.constants = new Constants();
    }

    getDataAll = async (req, res) => {
        const getData = await this.TaskManager.TaskManagerModel.find({});
        try {
            if(!getData) {
                return res.status(500).json({ msg: Constants.TASK_NOT_FOUND });
            }
            return res.status(200).json({ "data": getData });    
        } catch (error) {
            return res.status(500).json({ "error": error });
        }
        
    }

    createData = (req, res) => {
        const data = req.body;

        try {
            let input = {
                "name" : data.name,
                "is_completed": false
            };
            const task = this.TaskManager.TaskManagerModel.create(input);
            return res.status(200).json({ "msg":"data successfully updated" });
        } catch (error) {
            return res.status(500).json({'error' : error});
        }
        
    }

    getSingleData = async (req, res) => {
        let {id:TaskId} = req.params;
        try {
            const task = await this.TaskManager.TaskManagerModel.findOne({_id: TaskId });
            if(!task) {
                return res.status(404).json({ msg: Constants.TASK_NOT_FOUND });
            }
            
            return res.status(200).json({ "data" : task });
        } catch (error) {
            return res.status(500).json({ "error": error });
        }
        
    }

    updateDataById = async (req, res) => {
        let {id:TaskId} = req.params;
        let data = req.body;
        try {
            const task = await this.TaskManager.TaskManagerModel.findOneAndUpdate({_id: TaskId}, data);
            if(!task) {
                return res.status(404).json({"msg": Constants.TASK_NOT_FOUND});
            }

            return res.status(200).json({ "data":Constants.TASK_UPDATED_SUCCESSFULLY });
        } catch (error) {
            return res.status(500).json({ "error":error });    
        }
        
    }

    deleteDataById = async (req, res) => {
        let {id: TaskId} = req.params;
        try {
            const task = await this.TaskManager.TaskManagerModel.findOneAndDelete({_id: TaskId});
            if(!task) {
                return res.status(404).json({"msg": Constants.TASK_NOT_FOUND});
            }
            return res.status(200).json({"msg":"record successfully deleted"});
        } catch (error) {
            return res.status(500).json({ "error":error });
        }
    }
}

const TaskControllerObj = new TaskController();

module.exports = TaskControllerObj;