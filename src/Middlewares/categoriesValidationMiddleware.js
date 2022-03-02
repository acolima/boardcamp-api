import { stripHtml } from "string-strip-html"
import connection from "../db.js"
import categorySchema from "../Schemas/categorySchema.js"

export async function categoriesValidation(req, res, next) {
  const categoryName = {
    name: stripHtml(req.body.name).result.trim()
  }

  const validation = categorySchema.validate(categoryName)
  if (validation.error)
    return res.status(400).send("O campo não pode ser vazio")

  try {
    const { rows: category } = await connection.query('SELECT id FROM categories WHERE name=$1', [categoryName.name])
    if (category.length > 0)
      return res.status(409).send("Categoria já existe")
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

  res.locals.categoryName = categoryName.name

  next()
}