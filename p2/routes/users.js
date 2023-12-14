const express =  require('express');

const router = express.Router();
const UserController = require('../controller/UserController');

//Get Users List
router.route('/register').post(UserController.createNewUser);

router.route('/login').post(UserController.loginUser);

router.route('/get-data').post(UserController.getUser);

router.route('/forgot-password').post(UserController.forgotPassword);

router.route('/change-password').post(UserController.changePassword);


module.exports = router;