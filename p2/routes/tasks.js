const express = require('express');

const app = express();
const router = express.Router();
const TaskControllerObj = require('../controller/TaskController');



// router.route('/tasks').get((req, res) => {
//     res.send("Hello World");
// });


router.route('/').get(TaskControllerObj.getData);



// app.get('/tasks', (req, res) => {
//     res.send('Hello World!')
//   })


module.exports = router;

