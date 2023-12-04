const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('./../model/Contacts');
const Controller = require('./Controller');


class Contact extends Controller{
    constructor() {
        super();
    }

    getContacts = asyncHandler(async(req, res) => {
        let contacts = Contacts.ContactsModel.find({});
        if(!contacts) {
            return this.msg_response(req, res, this.Constants.TASK_NOT_FOUND);
        }
        return this.success_response(getContacts);
    })

    createContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email, mobile no
        let validation = {
            'first_name'    : 'required|string|maxlength:40',
            'last_name'     : 'required|string|maxlength:40',
            'email'         : 'email|maxlength:40',//use regex
            'mobile'        : 'required|mobile', //use regex
        }

        this.Validator.make(req, res, validation);
        /*if (this.Validator.fails()) {
            //return validation error
			//return $this->returnValidationErrors($Validator, 'Invalid data');
            res.status(400);
            throw new Error(this.Validator.message);
		}

        let data = {
            'first_name' : req.body.first_name,
            'last_name' : req.body.last_name,
            'email' : req.body.email,
            'phone' : req.body.phone,
        }

        let contact = Contacts.ContactsModel.create(data);
        if(!contact) {
            return this.msg_response(req, res, this.Constants.SOMETHING_WENT_WRONG);
        }
        return this.success_response(req, res, contact, this.Constants.RECORD_UPDATED_SUCCESSFULLY);*/
        return this.msg_response(req, res, this.Constants.RECORD_UPDATED_SUCCESSFULLY);
    })

    updateContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email

        let id = req.params.id;
        let data ={};
        if(req.body.first_name) { data.first_name = req.body.first_name }
        if(req.body.last_name) { data.first_name = req.body.last_name }
        if(req.body.email) { data.first_name = req.body.email }
        //phone no. can not be changed.
        if(!data) {
            //validation error
        }
        
        let contact = Contacts.ContactsModel.findOneAndUpdate({[Contacts.ID]: id}, data);
        if(!contact) {
            return this.msg_response(this.Constants.RECORD_NOT_FOUND);
        }
        return this.success_response(req, res, contact, this.Constants.RECORD_UPDATED_SUCCESSFULLY + `for $(req.params.id)`);

    })

    deleteContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email
        let id = req.params.id;
        let contact = Contacts.ContactsModel.findOneAndDelete({[Contacts.ID]: id}, data);
        if(!contact) {
            return this.msg_response(this.Constants.RECORD_NOT_FOUND);
        }
        return this.success_response(req, res, contact, this.Constants.RECORD_UPDATED_DELETED + `for $(req.params.id)`);
    })
};

const ContactObj = new Contact();
module.exports = ContactObj;