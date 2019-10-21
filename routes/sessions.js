/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
let cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ["123"]
}));

module.exports = (db) => {
  router.get("/register", (req, res) => {

    db.query(`select * from users`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
//create function to get a user with id
  router.post("/register", (req, res) => {
    //check if user exists, if not redirect to homepage otherwise render /users/:id/maps
    res.send("In here you will have cookies set up for new user and users saved into db")
});


// GETS users maps page
  router.post("/login", (req, res) => {
    //set cookie once the email and username matches

    res.send("Should set a cookie if user and password match the db");
  });


   return router;
};


