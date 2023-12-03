const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('./../model/Contacts');
const Controller = require('./Controller');

class Contact extends Controller{
    constructor() {
        super();
    }

    getContacts = asyncHandler(async(req, res) => {
        let getContacts = Contacts.ContactsModel.find({});
        if(!getContacts) {
            ////return res.status(400).json({"msg":this.Constants.TASK_NOT_FOUND});    
            return this.msg_response(this.Constants.TASK_NOT_FOUND);
        }
        return res.status(200).json({"data":getContacts});
    })

    createContact = asyncHandler(async(req, res) => {
        return res.status(200).json({"test":"Create Contact"});
    })

    updateContact = asyncHandler(async(req, res) => {
        return res.status(200).json({"test":`Update Contact $(req.params.id)`});
    })

    deleteContact = asyncHandler(async(req, res) => {
        return res.status(200).json({"test":"Delete Contact"});
    })
};

const ContactObj = new Contact();
module.exports = ContactObj;