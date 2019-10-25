// All routes in this file are mounted onto url/maps/...

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GETS user maps page
  router.get("/", (req, res) => {
    let user = req.session.user_id;
    db.query(`SELECT * FROM maps`)
    .then(result => {
    res.json( {result: result.rows})
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // gets all pins for specific map
  router.get("/:id/pins", (req, res) => {
    db.query(`SELECT * FROM pins
    WHERE map_id = $1;`, [req.params.id])
    .then(result => {
    console.log(req.params.id)
    res.json( {result: result.rows})
    })
    .catch(err => res.status(500).send(err))
  });

  // only show data for specfic pin
  router.delete("/:mapid/pins/:pinId", (req, res) => {

    db.query(`DELETE from pins WHERE id = $1;`, [req.params.pinId])
    .then(result => {
    res.json( {result: result.rows})
    })
    .catch(err => res.status(500).send(err))
  });

  // insert new pin data into existing map
  router.post("/:mapid/pins", (req, res) => {

    res.json( {result: result.rows})
  });

   return router;
};
