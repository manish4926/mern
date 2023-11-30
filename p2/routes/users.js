const express =  require('express');

const router = express.Router();
//Call Controller Obj
const UserControllerObj = require('../controller/UserController');

// router.route('/users').get((req, res) => {
//     res.send("Hello World");
// })

//Get Users List
router.route('/register').post(UserControllerObj.createNewUser);


module.exports = router;