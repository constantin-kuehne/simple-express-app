const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");

const catsRoutes = require("./routes/cats-routes");

const PORT = 2000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cats", catsRoutes);

app.use((req, res, next) => {
  console.log("test");
  next(createError(404));
});

mongoose
  .connect("mongodb://admin:password@127.0.0.1:27017/?retryWrites=true")
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
