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

  router.delete("/:mapid", (req, res) => {

    db.query(`DELETE from maps WHERE id = $1;`, [req.params.mapid])
    .then(result => {
    res.json( {result: result.rows})
    })
    .catch(err => res.status(500).send(err))
  });
  //insert new pin data into existing map
  router.post("/:mapid/pins", async (req, res) => {
    //let values = [req.params.mapid ];
    // db.query(`INSERT INTO pins (map_id, comment, latitude, longitude) values ($1, $2, $3, $4) where map_id = $5`, [req.params.id])
    // res.json( {result: result.rows})
    console.log("here !");
    await Promise.all(req.body.markers.map(pin =>
      db.query('INSERT INTO pins (map_id, comment, latitude, longitude) values ($1, $2, $3, $4);',
               [req.params.mapid, pin.comment, pin.lat, pin.lng]))
    )
    console.log("after promise");
  });

   return router;
};
