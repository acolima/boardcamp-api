import dayjs from "dayjs"
import connection from "../db.js"

export async function addRental(req, res) {
  const { rental } = res.locals
  const date = dayjs().format('YYYY-MM-DD')

  try {
    const searchCustomer = await connection.query(`
      SELECT * FROM customers WHERE id=$1
    `, [rental.customerId])

    if (searchCustomer.rowCount === 0) return res.sendStatus(400)

    const searchGame = await connection.query(`
      SELECT * FROM games WHERE id=$1
    `, [rental.gameId])

    if (searchGame.rowCount === 0) return res.sendStatus(400)

    // verificar o estoque disponível
    //console.log(searchGame.rows[0].stockTotal)

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
  const { customerId, gameId } = req.query
  let whereCondition = ''

  if (customerId && gameId)
    whereCondition = `WHERE customers.id=${customerId} AND games.id=${gameId}`
  else if (customerId)
    whereCondition = `WHERE customers.id=${customerId}`
  else if (gameId)
    whereCondition = `WHERE games.id=${gameId}`

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