// All routes in this file are mounted onto url/maps/...

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GETS user pins
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM pins;`)
      .then(data => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
