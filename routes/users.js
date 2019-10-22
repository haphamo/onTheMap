/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//connecting to database
const { Pool } = require('pg');//getting modules to connect to database (bootcampx)

//the user does not use this route, we created a session route once user logs in
module.exports = (db) => {
  router.post("/1/maps", (req, res) => {
    //check if user exists, if not redirect to homepage otherwise render /users/:id/maps
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


// GETS users maps page
router.post("/maps", (req, res) => {

    res.send("This shows the users map");
  });

  // GETS users favorites page
  router.get("/favorites", (req, res) => {

  });

   return router;
};


