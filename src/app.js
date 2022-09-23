const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("../src/routers/task");

const app = express();
const MONGODB_URL = process.env.MONGODB_URL;
// console.log("ENV", process.env.ENVIRONMENT);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = { app, MONGODB_URL };
