import connection from "../db.js"

export async function addGame(req, res) {
  const { newGame } = res.locals

  try {
    await connection.query(`
      INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES
        ($1, $2, $3, $4, $5)`,
      [newGame.name, newGame.image, newGame.stockTotal, newGame.categoryId, newGame.pricePerDay]
    )
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function listGames(req, res) {
  const gameName = req.query.name

  try {
    if (gameName) {
      const { rows: games } = await connection.query(`
        SELECT games.*, categories.name AS "categoryName" 
        FROM games
        JOIN categories ON categories.id=games."categoryId"
        WHERE LOWER(games.name) LIKE LOWER($1)
      `, [`${gameName}%`])
      return res.send(games)
    }

    const { rows: games } = await connection.query(`
      SELECT games.*, categories.name AS "categoryName" FROM games
        JOIN categories ON categories.id=games."categoryId"
    `)

    res.send(games)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}