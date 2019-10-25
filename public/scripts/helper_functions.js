

const renderMaps = async function(userId, db) {

  const input = (Number(userId)|0).toString();


  // await db.query(`SELECT maps.id
  //                          FROM maps
  //                          JOIN users ON users.id = maps.id
  //                          WHERE user_id = ${input}`)
  await db.query(`SELECT 7;`)

 return db.rows //hopefully [[7]] is the result

}

