import connection from "../db.js"

export async function listCategories(req, res) {
  try {
    const { rows: categories } = await connection.query('SELECT * FROM categories')

    res.send(categories)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export async function addCategory(req, res) {
  const { categoryName } = res.locals

  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [categoryName])

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}