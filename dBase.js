const config = require("./config.json");
const mongoose = require("mongoose");
const Book = require("./model/Book");

mongoose.connect(process.env.MONGODB_URI || config.connectionString)
 .then( () => {
     console.log ("Database connection successful")
 },
 err => {
     console.log("Database connection error!!!")
 });

 module.exports = { Book };