/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const api_key = process.env.API_KEY;

module.exports = (db) => {

  // List of all maps user has created
  router.get("/maps", (req, res) => {
    //query here to retreive data from database of the maps of the user
    let templateVars;
    let mapId;
    const user = req.session.user_id;
    const renderMaps = async function(userId) {
      const input = (Number(userId)|0).toString();
      return await db.query(`SELECT *
                             FROM maps
                             WHERE user_id = ${input};`).then(result => result.rows)
    }

    //functions loops through the map data to send variables to users_maps
    renderMaps(user).then(mapsArray => {
      mapsArrayResult = mapsArray;
        for (map of mapsArray){
        }
      templateVars = { api_key, user_id: req.session.user_id, results: mapsArray}

      res.render("users_maps", templateVars)

      }).catch(err => {
        console.log(err);
      })

    })
    // the create map page
    router.get("/maps/create", (req, res) => {
      let templateVars = { api_key, user_id: req.session.user_id }
     res.render("create_page", templateVars)
    })

    router.get("/maps/:id", (req, res) => {
      let templateVars = { api_key, user_id: req.session.user_id , mapid: req.params.id}
      res.render("map_view", templateVars)//renders the specfic
    })

    //User submits new map
    router.post("/maps/create", async (req, res) => {
      const userId = req.session.user_id
      try {
        const result = await db.query(`INSERT INTO maps (user_id, title, description)
        VALUES ($1, $2, $3 ) RETURNING *`, [userId, req.body.title, req.body.description])
        await Promise.all(req.body.markers.map(pin =>
          db.query('INSERT INTO pins (map_id, comment, latitude, longitude) values ($1, $2, $3, $4);',
                   [result.rows[0].id, pin.comment, pin.lat, pin.lng]))
        )
        res.json({status:'ok', mapId: result.rows[0].id});
      } catch (err) {
        console.error(err);
      }
    })

    router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [req.body.email, req.body.password])

    .then(data => {

      if (data.rows[0]) {
        // sets the cookie user_id to the user's id
        req.session.user_id = data.rows[0].id
        return res.redirect("/maps")//if user is logged in send them to their users page
      } else {
        return res.send("fields do not match")//else send them back to the home page
      }
    })
    .catch(err => {

      console.log("got an error", err)
    })
  });

  router.post("/logout", (req, res)=> {
    req.session = null
    res.redirect("/");
  })
   return router;
};

