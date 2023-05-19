const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT | 4461;
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');
require("dotenv").config();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
  app.use(
      express.urlencoded({
        extended: true,
      })
    );
    
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());
  
  app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));


  app.use(
    session({
      secret: process.env.OUR_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
      }),
    })
  );

  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {console.log("Connected to database!")})
  .catch((err) => {console.log("Connection failed!", err)});

app.use('/api', require('./route'));


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});