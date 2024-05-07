const express = require('express');
const router = express.Router();
const Calculator = require('./../controller/CalculatorController');


// router.get('/user/:id', auth({allowedGroup: readGroup}), asyncHandler(async(req, res, next) => {
//     ... // your stuff here
//     res.status(200).json(data);
// })) 

router.route('/calculator/sip').get(Calculator.calculateSIP);

router.route('/calculator/stepupsip').get(Calculator.calculateStepUpSIP);

router.route('/calculator/sip/achiever').get(Calculator.sipAchiever);

router.route('/calculator/emi/repayemnt').get(Calculator.repaymentCalculator);


module.exports = router;