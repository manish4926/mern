const express = require('express');
require('dotenv').config();
const DB = require('./config/db');
const notFoundMiddleware = require('./middleware/not-found');

//Route Importing
const api  = require('./routes/api');
const tasks  = require('./routes/tasks');
const users  = require('./routes/users');
const contact  = require('./routes/contact');
const errorHandler = require('./middleware/errorHandler');


const port = process.env.SERVER_PORT; ///from env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Initialize a single instance for the whole app


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  });
  

  app.use((req, res, next) => {
    const combinedData = { ...req.body, ...req.query };
    req.body = combinedData;
    next();
  });

// Core Apis
//app.use('/api/v1/core', api);

app.use('/api/v1/', api);

// Genral Apis
app.use('/api/v1/user', users);

//Task Manager Apis
app.use('/api/v1/tasks', tasks);

//Contact Manager Apis
app.use('/api/v1/contact', contact);


app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(port, console.log(`Server connected to port ${port}....`));

DB.connectDB();
