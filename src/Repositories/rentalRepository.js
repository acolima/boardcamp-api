import connection from "../db.js"

async function createRental(newRental) {
  const { customerId, gameId, date, daysRented, originalPrice } = newRental
  return connection.query(`
    INSERT INTO rentals
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES
      ($1, $2, $3, $4, null, ${originalPrice}, null)
  `, [customerId, gameId, date, daysRented])
}

async function deleteRental(id) {
  return connection.query(`
    DELETE FROM rentals WHERE id=$1
  `, [id])
}

async function getRentals(whereCondition, status, startDate, offset, limit, order) {
  return connection.query(`
    SELECT 
      rentals.*,
      customers.id AS "cId",
      customers.name AS "cName",
      games.id AS "gId",
      games.name AS "gName",
      games."categoryId",
      categories.name AS "categoryName"
    FROM rentals
    JOIN customers ON customers.id = rentals."customerId"
    JOIN games ON games.id = rentals."gameId"
    JOIN categories ON categories.id = games."categoryId"
    ${whereCondition} ${status} ${startDate}
    ${offset}
    ${limit}
    ${order}
  `)
}

async function getRentalById(id) {
  return connection.query(`
    SELECT * FROM rentals WHERE id=$1
  `, [id])
}

async function getRentedGames(id) {
  return connection.query(`
    SELECT "gameId", "returnDate" FROM rentals
    WHERE "gameId"=$1 AND "returnDate" IS null
  `, [id])
}

async function getRentalInfos(id) {
  return connection.query(`
    SELECT rentals.*, 
      games."pricePerDay" AS price 
    FROM rentals 
    JOIN games ON games.id=rentals."gameId"      
    WHERE rentals.id=$1
  `, [id])
}

async function returnRental(returnDate, delayFee, id) {
  return connection.query(`
    UPDATE rentals
    SET 
      "returnDate"=$1, 
      "delayFee"=$2
    WHERE id=$3
  `, [returnDate, delayFee, id])
}

export const rentalRepository = {
  createRental,
  deleteRental,
  getRentals,
  getRentalById,
  getRentedGames,
  getRentalInfos,
  returnRental
}