const express = require('express');
require('dotenv').config();
const DB = require('./config/db');
const notFoundMiddleware = require('./middleware/not-found');
const CorsMiddleware = require('./middleware/cors');

//Route Importing
//const api  = require('./routes/api');
const tasks  = require('./routes/tasks');
const users  = require('./routes/users');


const port = process.env.SERVER_PORT; ///from env;
const app = express();

app.use(express.json());
app.use(CorsMiddleware);


// Core Apis
//app.use('/api/v1/core', api);

// Genral Apis
app.use('/api/v1/user', users);

//Task Manager Apis
app.use('/api/v1/tasks', tasks);


app.use(notFoundMiddleware);

app.listen(port, console.log(`Server connected to port ${port}....`));

DB.connectDB();