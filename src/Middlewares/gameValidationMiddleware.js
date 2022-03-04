import gameSchema from "../Schemas/gameSchema.js"
import { stripHtml } from "string-strip-html"

export function gameValidation(req, res, next) {
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

  res.locals.newGame = game

  next()
}