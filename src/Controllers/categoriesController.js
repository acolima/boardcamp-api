import connection from "../db.js"
import replaceAllInserter from 'string.prototype.replaceall';
import querySchema from "../Schemas/querySchema.js";
replaceAllInserter.shim();

export async function listCategories(req, res) {
  const { query } = res.locals
  query.order = (query.order).replaceAll("'", "\"")

  let offset = ''
  if (query.offset) offset = `OFFSET ${query.offset}`

  let limit = ''
  if (query.limit) limit = `LIMIT ${query.limit}`

  let order = ''
  if (query.order && query.order !== 'NULL')
    if (query.desc) order = `ORDER BY ${query.order} DESC`
    else order = `ORDER BY ${query.order}`

  try {
    const { rows: categories } = await connection.query(`
      SELECT * FROM categories
      ${offset}
      ${limit}
      ${order}
    `)

    res.send(categories)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function addCategory(req, res) {
  const { name: categoryName } = req.body

  try {
    const searchCategory = await connection.query(`
      SELECT id FROM categories WHERE name=$1
    `, [categoryName])

    if (searchCategory.rowCount !== 0) {
      return res.status(409).send("Categoria já existe")
    }

    await connection.query('INSERT INTO categories (name) VALUES ($1)', [categoryName])

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}