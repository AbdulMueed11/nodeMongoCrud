const express = require("express");
const joi = require("@hapi/joi");
const app = express();

const mongoose = require("mongoose");
const db = require("./dBase");

const Books = db.Book;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("I m in the base URL");
  });
  
  // get by ID
  app.get("/getID", async (req, res) => {
    let Book = await Books.find({ _id: "5d1d9426bb6a846581551c02" });
    console.log("query", req.query);
    res.send(Book);
  });
  
  // get all data
  app.get("/getAll", async (req, res) => {
    let Book = await Books.find();
    console.log("query", req.query);
    res.send(Book);
  });
  
//   app.get("/viewAllBooksSort", async (req, res) => {
//     let Book = await Books.find().sort({ _id: -1 });
//     console.log("query", req.query);
//     res.send(Book);
//   });

// get all with limit
  app.get("/getAllLimit", async (req, res) => {
    let Book = await Books.find().limit(2);
    console.log("query", req.query);
    res.send(Book);
  });
  
  // Posting data
  app.post("/addBooks", (req, res) => {
    const book = new Books({ name: "Intro to Perl" });
    book.save().then(
      () => {
        console.log("Book added");
      },
      err => {
        console.log("Error in adding book");
      }
    );
    res.send(book);
  });
  
  // Delete data
  app.delete("/deleteBooks", async (req, res) => {
    await Books.findOneAndDelete({ _id: "5d2259efcd48691bb4e402af" }).then(() => {
      console.log("Data Deleted"),
        err => {
          console.log("Error Delete");
        };
    });
  });
  
  // Update data
  app.put("/updateBooks", async (req, res) => {
    await Books.findOneAndUpdate(
      { _id: "5d2259e3e7973938480e7ac2" },
      { name: "OOP" }
    ).then(() => {
      console.log("Data Updated"),
        err => {
          console.log("Error Update");
        };
    });
  });
  
// Server running port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});