import dayjs from "dayjs"
import connection from "../db.js"

export async function addRental(req, res) {
  const { rental } = res.locals
  const date = dayjs().format('YYYY-MM-DD')

  if (rental.daysRented === 0) return res.sendStatus(400)

  try {
    const searchCustomer = await connection.query(`
      SELECT * FROM customers WHERE id=$1
    `, [rental.customerId])

    if (searchCustomer.rowCount === 0) return res.sendStatus(400)

    const searchGame = await connection.query(`
      SELECT * FROM games WHERE id=$1
    `, [rental.gameId])

    if (searchGame.rowCount === 0) return res.sendStatus(400)

    const { rows: rentedGames } = await connection.query(`
      SELECT "gameId", "returnDate" FROM rentals
      WHERE "gameId"=$1 AND "returnDate" IS null
    `, [rental.gameId])

    const stockTotal = searchGame.rows[0].stockTotal
    if (rentedGames.length >= stockTotal) return res.sendStatus(400)

    const gamePrice = searchGame.rows[0].pricePerDay
    const originalPrice = gamePrice * rental.daysRented

    await connection.query(`
      INSERT INTO rentals
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES
        ($1, $2, $3, $4, null, ${originalPrice}, null)
    `, [rental.customerId, rental.gameId, date, rental.daysRented])

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}


export async function listRentals(req, res) {
  const { query } = res.locals

  let offset = ''
  if (query.offset)
    offset = `OFFSET ${req.query.offset}`

  let limit = ''
  if (query.limit)
    limit = `LIMIT ${req.query.limit}`

  let whereCondition = ''
  if (query.customerId && query.gameId)
    whereCondition = `WHERE customers.id=${query.customerId} AND games.id=${query.gameId}`
  else if (query.customerId)
    whereCondition = `WHERE customers.id=${query.customerId}`
  else if (query.gameId)
    whereCondition = `WHERE games.id=${query.gameId}`

  try {
    const { rows: rentals } = await connection.query(`
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
      ${whereCondition}
      ${offset}
      ${limit}
    `)

    const rentalsList = rentals.map(r => {
      const rental = {
        id: r.id,
        customerId: r.customerId,
        gameId: r.gameId,
        rentDate: r.rentDate,
        daysRented: r.daysRented,
        returnDate: r.returnDate,
        originalPrice: r.originalPrice,
        delayFee: r.delayFee,
        customer: {
          id: r.cId,
          name: r.cName
        },
        game: {
          id: r.gId,
          name: r.gName,
          categoryId: r.categoryId,
          categoryName: r.categoryName
        }
      }
      return rental
    })

    res.send(rentalsList)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function returnRental(req, res) {
  const { id } = req.params
  const returnDate = dayjs().format('YYYY-MM-DD')

  try {
    const { rows: result } = await connection.query(`
      SELECT rentals.*, 
        games."pricePerDay" AS price FROM rentals 
      JOIN games ON games.id=rentals."gameId"      
      WHERE rentals.id=$1
    `, [id])

    const rental = result[0]

    if (result.length === 0) return res.sendStatus(404)
    if (rental.returnDate !== null) return res.sendStatus(400)

    let rentDate = dayjs(rental.rentDate)

    let dateDifference = dayjs().diff(rentDate, 'days')
    const delayFee = dateDifference * rental.price

    await connection.query(`
      UPDATE rentals
      SET 
        "returnDate"=$1, 
        "delayFee"=$2
      WHERE id=$3
    `, [returnDate, delayFee, id])

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params

  try {
    const { rows: rental } = await connection.query(`
      SELECT * FROM rentals WHERE id=$1
    `, [id])

    if (rental.length === 0)
      return res.sendStatus(404)

    if (rental[0].returnDate !== null)
      return res.sendStatus(400)

    await connection.query(`
      DELETE FROM rentals WHERE id=$1
    `, [id])

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}