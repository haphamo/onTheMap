/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//create a function that generates a random id
let generateRandomString = function() {
  let randomId = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    randomId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomId;
};


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

    db.query(`SELECT * FROM users WHERE users.email = $1 AND users.password = $2;`, [req.body.email, req.body.password])
    .then(data => {
      if (data.rows[0]) {

        res.render("users")//if user is logged in send them to their users page
      } else {
        res.send("fields do not match")//else send them back to the home page
      }

    })
    .catch(err => {
      console.log("got an error", err)
    })
  });

   return router;
};


