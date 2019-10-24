// this route shows all the pins

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GETS user pins
  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM pins;`)
    db.query(`SELECT pins.*
              FROM pins
              JOIN maps ON maps.id = pins.map_id
              JOIN users ON users.id = maps.user_id
              WHERE users.id = maps.user_id `)
    .then(data => data.rows.map(pin => {
      return {comment: pin.comment,
              coords: {lat: Number(pin.latitude),
                       lng: Number(pin.longitude)}}}))
      .then(pins => {
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
