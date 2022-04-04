import connection from "../db.js"

async function createCategory(name) {
  return connection.query(`
    INSERT INTO categories (name) 
    VALUES ($1)
  `, [name])
}

async function getCategoryById(id) {
  return connection.query(`
    SELECT id 
    FROM categories 
    WHERE categories.id=$1
  `, [id])
}

async function getCategoryByName(name) {
  return connection.query(`
    SELECT id FROM categories WHERE name=$1
  `, [name])
}

async function listCategories(offset, limit, order) {
  return connection.query(`
    SELECT * FROM categories
    ${offset}
    ${limit}
    ${order}
  `)
}

export const categoryRepository = {
  createCategory,
  getCategoryById,
  getCategoryByName,
  listCategories
}