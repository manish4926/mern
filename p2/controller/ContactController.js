const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('./../model/Contacts');
const Controller = require('./Controller');
const { CreateLog } = require('../core/Logger');
const {webGroup} = require('./../middleware/webGroup');

class Contact extends Controller{
    constructor() {
        super();
    }

    // TODO all can be done by logged in user only
    // TODO need to create (web )middleware which handles asyncHandler and Authorization Keys + JWT Tokens
    getContacts = asyncHandler(async(req, res) => {
        let contacts = await Contacts.Model.find({});
        ////let contacts = await Contacts.paginate(req, {});
        if(!contacts) {
            return this.msg_response(req, res, this.Constants.RECORD_NOT_FOUND);
        }
        // TODO create pagiantion for response
        return this.success_response(req, res, contacts);
    })

    createContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email, mobile no
        let validation = {
            'first_name'    : 'required|string|maxlength:40',
            'last_name'     : 'required|string|maxlength:40',
            'email'         : 'email|maxlength:40',//use regex
            'phone'        : 'required|mobile', //use regex
        }

        this.Validator.make(req, res, validation);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}

        let data = {
            'first_name' : req.body.first_name,
            'last_name' : req.body.last_name,
            'email' : req.body.email,
            'phone' : req.body.phone
        }

        let contact = Contacts.Model.create(data);
        if(!contact) {
            return this.msg_response(req, res, this.Constants.SOMETHING_WENT_WRONG);
        }
        return this.success_response(req, res, data, this.Constants.RECORD_UPDATED_SUCCESSFULLY);
    })

    getContactsById = asyncHandler(async(req, res) => {
        let {id:ContactId} = req.params;
        if(!ContactId) {
            res.status(400);
            throw new Error(this.Constants.INVAID_ID);
        }

        let contacts = await Contacts.Model.findOne({[Contacts.ID] : ContactId});
        if(!contacts) {
            return this.msg_response(req, res, this.Constants.RECORD_NOT_FOUND);
        }
        return this.success_response(req, res, contacts);
    })

    updateContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email
        let {id:ContactId} = req.params;
        if(!ContactId) {
            res.status(400);
            throw new Error(this.Constants.INVAID_ID);
        }

        let data ={};
        if(req.body.first_name) { data.first_name = req.body.first_name }
        if(req.body.last_name) { data.first_name = req.body.last_name }
        if(req.body.email) { data.first_name = req.body.email }
        //phone no. can not be changed.

        if(this.Helpers.isObjectEmpty(data)) {
            res.status(400);
            throw new Error(this.Constants.INVALID_INPUT);
        }
        
        let contact = Contacts.Model.findOneAndUpdate({[Contacts.ID]: ContactId}, data);
        if(!contact) {
            return this.msg_response(req, res,this.Constants.RECORD_NOT_FOUND);
        }
        let msg = this.Constants.RECORD_UPDATED_SUCCESSFULLY + `for ${req.params.id}`;

        // TODO get updated message and response in data
        return this.success_response(req, res, {}, msg);

    })

    deleteContact = asyncHandler(async(req, res) => {
        //check validation for id, first_name, last_name, email
        let id = req.params.id;
        let contact = Contacts.Model.findOneAndDelete({[Contacts.ID]: id}, data);
        if(!contact) {
            return this.msg_response(this.Constants.RECORD_NOT_FOUND);
        }
        return this.success_response(req, res, contact, this.Constants.RECORD_UPDATED_DELETED + `for $(req.params.id)`);
    })
};

//const ContactObj = new Contact();
module.exports = new Contact();