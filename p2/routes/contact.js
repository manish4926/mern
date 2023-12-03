const express = require('express');
const router = express.Router();
const ContactObj = require('./../controller/ContactController');

router.route('/').get(ContactObj.getContacts);

router.route('/').post(ContactObj.createContact);

router.route('/:id').put(ContactObj.updateContact);

router.route('/:id').delete(ContactObj.deleteContact);


module.exports = router;