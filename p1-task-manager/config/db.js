require("dotenv").config();

const MONGODB = "mongodb";
const MYSQL = "mysql";
let defaultDB = process.env.DEFAULT_DATABASE;

const mongoose = require("mongoose");
//check if db is connected or not

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;

async function connectDB() {
  try {
    await mongoose
      .connect("mongodb+srv://" + username + ":" + password + "@" + cluster + "/node_practice")
      .then(() => console.log("Database Connected!"))
      .catch((err) => console.log("Database not connected. " + err));
  } finally {
    //   await client.close();
  }
}

// switch (defaultDB) {
//   case MONGODB:

//     break;
//   case MYSQL:
//     console.log("test mysql db");
//     break;
//   default:
//     console.log("Invalid DB");
//     break;
// }

module.exports = { connectDB };
