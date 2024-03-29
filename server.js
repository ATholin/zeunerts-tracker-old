const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
require("dotenv").config();

// routes
const places = require("./routes/api/places");
const near = require("./routes/api/near");

const app = express();

// Force https
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("http://" + req.get("host") + req.url);
  }
  next();
}

if (process.env.NODE_ENV === "production") {
  app.use(requireHTTPS);
}

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Compression
app.use(compression());

// DB Config
const db = process.env.MONGODB_URI || "mongodb://localhost/zeunerts-tracker";

// Connect to Mongo
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/places", places);
app.use("/api/near", near);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));