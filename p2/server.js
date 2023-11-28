const express =     require('express');
require('dotenv').config();
const DB = require('./config/db');

//Route Importing
const tasks = require('../p1-task-manager/routes/tasks');


const port = process.env.SERVER_PORT; ///from env;
const app = express();

app.use(express.json);


app.use('/api/v1', tasks);




app.listen(port, console.log(`Server connected to port ${port}....`));

DB.connectDB();