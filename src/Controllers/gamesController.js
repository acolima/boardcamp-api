import connection from "../db.js"

export async function addGame(req, res) {
  const { newGame } = res.locals

  try {
    const searchCategory = await connection.query(`
      SELECT id FROM categories WHERE categories.id=$1
    `, [newGame.categoryId])

    if (searchCategory.rowCount === 0)
      return res.status(400).send("Categoria não existe")

    const searchGame = await connection.query(`
      SELECT id FROM games WHERE games.name=$1
    `, [newGame.name])

    if (searchGame.rowCount !== 0)
      return res.status(409).send("Jogo já cadastrado")

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
  let whereCondition = ''

  if (gameName)
    whereCondition = `WHERE LOWER(games.name) LIKE LOWER('${gameName}%')`

  try {
    const { rows: games } = await connection.query(`
      SELECT 
        games.*, 
        categories.name AS "categoryName" 
      FROM games
      JOIN categories ON categories.id=games."categoryId"
      ${whereCondition}
    `)

    res.send(games)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}