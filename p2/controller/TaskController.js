const express = require('express');
const mongoose = require('mongoose');


class TaskController {
    constructor() {

    }

    getData = (req, res) => {
        //const getData = mongoose.
        return res.status(200).json({ "test":'response 1' });
    }

    createData = (req, res) => {
        return res.status(200).json({ "test":'response' });
    }

    getSingleData = (req, res) => {
        return res.status(200).json({ "test":'response' });
    }

    updateData = (req, res) => {
        return res.status(200).json({ "test":'response' });
    }

    deleteData = (req, res) => {
        return res.status(200).json({ "test":'response' });
    }
}

const TaskControllerObj = new TaskController();

module.exports = TaskControllerObj;