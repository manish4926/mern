const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB = "MONGODB";
const MYSQL = "MYSQL";
const DEFAULT_DATABASE = process.env.DEFAULT_DATABASE;

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;


const connectDB = async () => {
    try {
        await mongoose
          .connect("mongodb+srv://" + username + ":" + password + "@" + cluster + "/node_practice")
          .then(() => console.log("Database Connected!"))
          .catch((err) => console.log("Database not connected. " + err));
    } catch (error) {
        console.log(`DB Not connected ${error}`);
        handleError(error);
    }
}


module.exports = {connectDB};