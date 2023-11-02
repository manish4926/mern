/**
 * This page is used to start a server so that all files can be called directly from this using api
 * This file includes server setup, config setup and database setup as well
 * In this project we can use both sql and mongodb as database for practice but seperately for now
 */
// import { es6Function } from './middleware/modules.mjs';
// const tasks = require('./routes/tasks');

//console.log(es6Functionchalk.blue('Hello world!'));
require('dotenv').config()
const express = require('express');
const app = express();
const BASE_URL = process.env.BASE_URL;
const DB = require('./config/db');
const routeIdentifier = require('./middleware/routeidentifier');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Route Importing
const tasks = require('./routes/tasks');


app.use(express.json())


//Default Routes
app.get('/',(req,res) => {
    res.send("best message");
})

//Route Calling
app.use('/api/v1', tasks);

app.use(routeIdentifier);
app.use(errorHandlerMiddleware);

const port = process.env.SERVER_PORT || 3000

//start port
app.listen(port, console.log(`Server is listening ${port}...`))



DB.connectDB();
