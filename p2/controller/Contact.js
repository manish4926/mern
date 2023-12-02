const express = require('express');
const asyncHandler = require('express-async-handler');

class Contact {
    getContacts = asyncHandler(async(req, res) => {
        return res.status(200).json({"test":"Get All COntacts"});
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