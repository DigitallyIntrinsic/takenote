// import express pkg
const express = require("express");
// import file system module
const fs = require("fs");
// import path module
const path = require("path");
// Helper method for generating ids specific to each object
const uniqid = require("uniqid");

// Determine which port will be used
const PORT = process.env.PORT || 3001;

// Creates a new app with the express pkg
const app = express();

// create the middleware functions to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Uses get command for route to return the index.html file
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);

// Uses get command for route to return the notes.html file
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// Get route -> which reads the db.json file and sends back the parsed JSON data
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        res.json(jsonData);
    });
});

// Reads the newly created notes from the request body and then adds them to the db.json file
const readThenAppendToJson = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);