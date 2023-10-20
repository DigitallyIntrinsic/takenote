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