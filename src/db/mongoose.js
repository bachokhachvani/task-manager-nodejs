const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path
    .resolve(__dirname, `../../config/${process.env.ENVIRONMENT}.env`)
    .replace(/\\/gm, "/"),
});

const MONGODB_URL = process.env.MONGODB_URL;

// console.log("MONGOURL", MONGODB_URL);
mongoose.connect(MONGODB_URL, {});
