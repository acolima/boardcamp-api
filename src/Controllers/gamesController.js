import { categoryRepository, gameRepository } from "../Repositories/index.js"

export async function addGame(req, res) {
  const { name, image, stockTotal, categoryId } = req.body
  let { pricePerDay } = req.body
  pricePerDay = parseInt(pricePerDay *= 100)

  try {
    const searchedCategory = await categoryRepository.getCategoryById(categoryId)
    if (searchedCategory.rowCount === 0)
      return res.status(400).send("Categoria não existe")

    const searchGame = await gameRepository.getGameByName(name)
    if (searchGame.rowCount !== 0)
      return res.status(409).send("Jogo já cadastrado")

    const newGame = {
      name, image, stockTotal, categoryId, pricePerDay
    }

    await gameRepository.createGame(newGame)

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
  if (query.name && query.name !== 'NULL')
    whereCondition = `WHERE LOWER(games.name) LIKE LOWER('${query.name}%')`
  let offset = ''
  if (req.query.offset) offset = `OFFSET ${req.query.offset}`
  let limit = ''
  if (req.query.limit) limit = `LIMIT ${req.query.limit}`

  let order = ''
  if (query.order && query.order !== 'NULL')
    if (query.desc) order = `ORDER BY ${query.order} DESC`
    else order = `ORDER BY ${query.order}`

  try {
    const { rows: games } = await gameRepository.listGames(
      whereCondition, offset, limit, order)

    res.send(games)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}