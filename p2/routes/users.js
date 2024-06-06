const express =  require('express');

const router = express.Router();
const UserController = require('../controller/UserController');

//Get Users List
router.route('/register').post(UserController.createNewUser);

router.route('/login').post(UserController.loginUser);

router.route('/get-data').get(UserController.getUser);

router.route('/forgot-password').post(UserController.forgotPassword);

router.route('/change-password').post(UserController.changePassword);

router.route('/get-data-mobile').get(UserController.getUserByMobile);

router.route('/update-user-data').post(UserController.addOrUpdateUserData);



module.exports = router;