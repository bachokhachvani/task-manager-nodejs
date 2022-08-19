const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { translateAliases } = require("./models/user");
const userRouter = require("./routers/user");
const taskRouter = require("../src/routers/task");
const { ObjectId } = require("mongodb");

const app = express();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     return res.send("you cant use that man!");
//   }
//   next();
// });

// app.use((req, res, next) => {
//   res.send("site is crashed!");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is runnin on port " + port);
});

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "123412" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFunction();

// const Task = require("./models/task");

// const main = async () => {
//   const task = await Task.findById("62fd5c895b29fdbde4cb42da");
//   // await task.populate("owner");

//   const user = await User.findById("62fd5ba4b7441e2832581086");
//   await user.populate("Usertasks");
//   console.log(user.Usertasks);
// };

// main();
