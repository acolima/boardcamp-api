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