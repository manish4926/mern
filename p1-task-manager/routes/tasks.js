const express = require('express');
const router = express.Router();
const TaskController = require('./../mini/task-manager/TaskController');


// router.use(cors);

router.route('/').get(TaskController.getTaskList);

router.route('/tasks').post(TaskController.createTask);

router.route('/tasks/:id').get(TaskController.getTaskById);

router.route('/tasks/:id').patch(TaskController.updateTask);

router.route('/tasks/:id').delete(TaskController.deleteTask);

module.exports = router;