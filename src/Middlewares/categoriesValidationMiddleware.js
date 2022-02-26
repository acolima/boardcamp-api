import joi from "joi"
import { stripHtml } from "string-strip-html"

const categorySchema = joi.object({
  name: joi.string().required()
})

export default function categoriesValidationMiddleware(req, res, next) {
  const categoryName = {
    name: stripHtml(req.body.name).result.trim()
  }

  const validation = categorySchema.validate(categoryName)
  if (validation.error)
    return res.status(400).send("O campo não pode ser vazio")

  res.locals.categoryName = categoryName.name

  next()
}