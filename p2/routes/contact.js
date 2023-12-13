const express = require('express');
const router = express.Router();
const ContactObj = require('./../controller/ContactController');
//const { authenticateToken, authorizeRole,testMiddleWare } = require('./../middleware/Auth');
const {webGroup} = require('./../middleware/webGroup');


// router.get('/user/:id', auth({allowedGroup: readGroup}), asyncHandler(async(req, res, next) => {
//     ... // your stuff here
//     res.status(200).json(data);
// })) 

router.route('/').get(webGroup, ContactObj.getContacts);

router.route('/').post(ContactObj.createContact);

router.route('/:id').get(ContactObj.getContactsById);

router.route('/:id').put(ContactObj.updateContact);

router.route('/:id').delete(ContactObj.deleteContact);


module.exports = router;