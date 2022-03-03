import { stripHtml } from "string-strip-html"
import categorySchema from "../Schemas/categorySchema.js"

export async function categoryValidation(req, res, next) {
  const categoryName = {
    name: stripHtml(req.body.name).result.trim()
  }

  const validation = categorySchema.validate(categoryName)
  if (validation.error)
    return res.status(400).send("O campo não pode ser vazio")

  res.locals.categoryName = categoryName.name

  next()
}