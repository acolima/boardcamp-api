import connection from "../db.js"

export async function listCategories(req, res) {
  try {
    const { rows: categories } = await connection.query('SELECT * FROM categories')

    res.send(categories)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function addCategory(req, res) {
  const { categoryName } = res.locals

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