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

// //Creating pool instance
// const pool = new Pool({//creating instance of Pool
//   user: 'labber',
//   password: '123',
//   host: 'localhost',
//   database: 'midterm'
// });
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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
const usersRoutes = require("./routes/users");
//const widgetsRoutes = require("./routes/widgets");
const mapsRoutes = require("./routes/maps");
const sessionRoutes = require("./routes/sessions")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/maps", mapsRoutes(db));
app.use("/sessions", sessionRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVars = { api_key }
  console.log(db);
  // Check if req.session.user_id exists
  // if it does use the session id to query that users maps & pins
  // then pass that information through templateVars for frontend to fetch with GoogleMaps
  res.render("home_page", templateVars);
});
//////////////////////////////////////////////////

app.get('/users', (req, res) => {
  res.render("users", )
});

app.get("/register", (req, res) => {
  res.render("register")
})
app.get('/favorites', (req, res) => {
  res.render("favorites")
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
