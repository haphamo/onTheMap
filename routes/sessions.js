/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const api_key = process.env.API_KEY;

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

  // GET users maps page
  router.get("/users", (req, res) => {
    let templateVars = { api_key }
    res.render("users", templateVars)
  });
 // GET users favorites page
  router.get("/favorites", (req, res) => {
    //check if user exists, if not redirect to homepage otherwise render /users/:id/maps
    res.render("favorites")
});

// GET users create page
  router.get("/create_page", (req, res) => {
    res.render("create_page")
  })

  router.get("/home_page", (req, res) => {
    let templateVars = { api_key }
    res.render("home_page", templateVars);
  });


// GETS users maps page
  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [req.body.email, req.body.password])
    .then(data => {
      if (data.rows[0]) {
        // sets the cookie user_id to the user's id
        req.session.user_id = data.rows[0].id
        console.log("req.session.user_id", data.rows[0].id)
        console.log('TEST: ', data.rows[0].id)
        res.redirect("users")//if user is logged in send them to their users page
      } else {
        res.send("fields do not match")//else send them back to the home page
      }

    })
    .catch(err => {
      console.log("got an error", err)
    })
  });
  //users edit map
  router.get("/edit", (req, res) => {
    res.render("edit_page")
  })
  //logout
  router.post("/logout", (req, res)=> {
    req.session = null
    res.redirect("/");
  })
   return router;
};



