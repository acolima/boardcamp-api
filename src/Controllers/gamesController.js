import connection from "../db.js"

export async function addGame(req, res) {
  const { name, image, stockTotal, categoryId } = req.body
  let { pricePerDay } = req.body
  pricePerDay = parseInt(pricePerDay *= 100)

  try {
    const searchCategory = await connection.query(`
      SELECT id FROM categories WHERE categories.id=$1
    `, [categoryId])

    if (searchCategory.rowCount === 0)
      return res.status(400).send("Categoria não existe")

    const searchGame = await connection.query(`
      SELECT id FROM games WHERE games.name=$1
    `, [name])

    if (searchGame.rowCount !== 0)
      return res.status(409).send("Jogo já cadastrado")


    await connection.query(`
      INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES
        ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    )

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function listGames(req, res) {
  const { query } = res.locals
  query.order = (query.order).replaceAll("'", "\"")
  query.name = (query.name).replaceAll("'", "")

  let whereCondition = ''
  if (query.name) whereCondition = `WHERE LOWER(games.name) LIKE LOWER('${query.name}%')`
  let offset = ''
  if (req.query.offset) offset = `OFFSET ${req.query.offset}`
  let limit = ''
  if (req.query.limit) limit = `LIMIT ${req.query.limit}`

  let order = ''
  if (query.order && query.order !== 'NULL')
    if (query.desc) order = `ORDER BY ${query.order} DESC`
    else order = `ORDER BY ${query.order}`
  console.log(whereCondition)
  try {
    const { rows: games } = await connection.query(`
      SELECT 
        games.*, 
        categories.name AS "categoryName" 
      FROM games
      JOIN categories ON categories.id=games."categoryId"
      ${whereCondition}
      ${offset}
      ${limit}
      ${order}
    `)

    res.send(games)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}