// load .env data into process.env
require('dotenv').config();


// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const api_key    = process.env.API_KEY;


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ["123"]
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const mapsRoutes = require("./routes/maps");
const pinsRoutes = require("./routes/pins");
const sessionRoutes = require("./routes/sessions")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/maps", mapsRoutes(db));
app.use("/api/pins", pinsRoutes(db));
app.use("/", sessionRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVars = { api_key, user_id: req.session.user_id }
  if (req.session.user_id) {
    res.render("users", templateVars)
  } else {
  console.log(db);

  res.render("home_page", templateVars);
  }
});


app.post('/register', (req, res) => {
  const user = req.body;
  console.log(req.body)
  db.query(`INSERT INTO users(full_name, email, password)
  VALUES($1, $2, $3) RETURNING *`,
    [user.full_name, user.email, user.password])
    .then(rows => {
      res.redirect("/maps");
    }).catch(err => console.log('error', err));
});


app.get('/register', (req, res) => {
  res.render("register", { user_id: req.session.user_id})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

