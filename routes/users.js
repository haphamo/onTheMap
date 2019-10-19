/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
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
  return router;
};

module.exports = (db) => {

  // GET request for Users Page
  router.get("/users", (req, res => {
    console.log('This is the Users Page')
  }))

  // GET request for Favourites Page
  router.get("/favourites" (req), res => {
    console.log('This is the Favourites Page')
  })

  // GET request for Create Page





};
