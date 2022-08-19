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

const multer = require("multer");
const upload = new multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("please upload a word doc"));
    }

    cb(undefined, true);

    // cb(new Error("file must be a PDF!"));
    // cb(undefined, true);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is runnin on port " + port);
});
