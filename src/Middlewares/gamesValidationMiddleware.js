import connection from "../db.js"
import gameSchema from "../Schemas/gameSchema.js"
import { stripHtml } from "string-strip-html"

export async function gamesValidation(req, res, next) {
  const game = {
    name: stripHtml(req.body.name).result.trim(),
    image: stripHtml(req.body.image).result.trim(),
    stockTotal: req.body.stockTotal,
    categoryId: req.body.categoryId,
    pricePerDay: req.body.pricePerDay
  }

  const validation = gameSchema.validate(game)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  const { rows: category } = await connection.query('SELECT id FROM categories WHERE categories.id=$1', [game.categoryId])
  if (category.length === 0)
    return res.status(400).send("Categoria não existe")

  const { rows: gameName } = await connection.query('SELECT id FROM games WHERE games.name=$1', [game.name])
  if (gameName.length !== 0)
    return res.status(409).send("Jogo já cadastrado")

  res.locals.newGame = game

  next()
}