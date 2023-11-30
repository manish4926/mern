const express = require('express');

const app = express();
const router = express.Router();
const TaskControllerObj = require('../controller/TaskController');



// router.route('/tasks').get((req, res) => {
//     res.send("Hello World");
// });


router.route('/').get(TaskControllerObj.getDataAll);
router.route('/').post(TaskControllerObj.createData);
router.route('/:id').get(TaskControllerObj.getSingleData);
router.route('/:id').patch(TaskControllerObj.updateDataById);
router.route('/:id').delete(TaskControllerObj.deleteDataById);



// app.get('/tasks', (req, res) => {
//     res.send('Hello World!')
//   })


module.exports = router;

