import connection from "../db.js"

async function createGame(newGame) {
  const { name, image, stockTotal, categoryId, pricePerDay } = newGame

  return connection.query(`
    INSERT INTO games 
      (name, image, "stockTotal", "categoryId", "pricePerDay")
    VALUES
      ($1, $2, $3, $4, $5)
  `, [name, image, stockTotal, categoryId, pricePerDay])
}

async function getGameById(id) {
  return connection.query(`
    SELECT * FROM games WHERE id=$1
  `, [id])
}

async function getGameByName(name) {
  return connection.query(`
    SELECT id 
    FROM games 
    WHERE games.name=$1
  `, [name])
}

async function listGames(whereCondition, offset, limit, order) {
  return connection.query(`
    SELECT 
      games.*, 
      categories.name AS "categoryName" 
    FROM games
    JOIN categories ON categories.id=games."categoryId"
    ${whereCondition}
    ${offset}
    ${limit}
    ${order}
  `)
}

export const gameRepository = {
  createGame,
  getGameById,
  getGameByName,
  listGames
}