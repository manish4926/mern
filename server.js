/**
 * This page is used to start a server so that all files can be called directly from this using api
 * This file includes server setup, config setup and database setup as well
 * In this project we can use both sql and mongodb as database for practice but seperately for now
 */
require('dotenv').config()
const express = require('express');
const app = express();
const BASE_URL = process.env.BASE_URL;
const DB = require('./config/db');

//Route Importing
const tasks = require('./routes/tasks');

app.use(express.json())


//Default Routes
app.get('/',(req,res) => {
    res.send("best message");
})

//Route Calling
app.use('/api/v1', tasks);

const port = process.env.SERVER_PORT

//start port
app.listen(port, console.log(`Server is listening ${port}...`))



DB.connectDB();
