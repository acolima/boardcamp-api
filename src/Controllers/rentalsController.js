import dayjs from "dayjs"
import { customerRepository, gameRepository, rentalRepository } from "../Repositories/index.js"

export async function addRental(req, res) {
  const { customerId, gameId, daysRented } = req.body

  const date = dayjs().format('YYYY-MM-DD')

  if (daysRented === 0) return res.sendStatus(400)

  try {
    const searchCustomer = await customerRepository.getCustomerById(customerId)
    if (searchCustomer.rowCount === 0) return res.sendStatus(400)

    const searchGame = await gameRepository.getGameById(gameId)
    if (searchGame.rowCount === 0) return res.sendStatus(400)

    const { rows: rentedGames } = await rentalRepository.getRentedGames(gameId)
    const stockTotal = searchGame.rows[0].stockTotal
    if (rentedGames.length >= stockTotal) return res.sendStatus(400)

    const gamePrice = searchGame.rows[0].pricePerDay
    const originalPrice = gamePrice * daysRented

    const newRental = {
      customerId, gameId, date, daysRented, originalPrice
    }
    await rentalRepository.createRental(newRental)

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function listRentals(req, res) {
  const { query } = res.locals
  query.order = (query.order).replaceAll("'", "\"")
  query.status = (query.status).replaceAll("'", "")

  let whereCondition = ''
  if (query.customerId && query.gameId)
    whereCondition = `WHERE customers.id=${query.customerId} AND games.id=${query.gameId}`
  else if (query.customerId)
    whereCondition = `WHERE customers.id=${query.customerId}`
  else if (query.gameId)
    whereCondition = `WHERE games.id=${query.gameId}`

  let offset = ''
  if (query.offset) offset = `OFFSET ${req.query.offset}`

  let limit = ''
  if (query.limit) limit = `LIMIT ${req.query.limit}`

  let order = ''
  if (query.order && query.order !== 'NULL')
    if (query.desc) order = `ORDER BY ${query.order} DESC`
    else order = `ORDER BY ${query.order}`

  let status = ''
  if (query.status && query.status !== 'NULL') {
    if (query.status === 'open') status = 'AND "returnDate" IS null'
    else if (query.status === 'closed') status = 'AND "returnDate" IS NOT null'
  }

  let startDate = ''
  if (query.startDate && query.startDate !== 'NULL') startDate = `AND "rentDate" >= ${query.startDate}`

  try {
    const { rows: rentals } = await rentalRepository.getRentals(
      whereCondition, status, startDate, offset, limit, order
    )

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
    const { rows: result } = await rentalRepository.getRentalInfos(id)

    const rental = result[0]

    if (result.length === 0) return res.sendStatus(404)
    if (rental.returnDate !== null) return res.sendStatus(400)

    let rentDate = dayjs(rental.rentDate)

    let dateDifference = dayjs().diff(rentDate, 'days')
    const delayFee = dateDifference * rental.price

    await rentalRepository.returnRental(returnDate, delayFee, id)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params

  try {
    const { rows: rental } = await rentalRepository.getRentalById(id)

    if (rental.length === 0)
      return res.sendStatus(404)

    if (rental[0].returnDate !== null)
      return res.sendStatus(400)

    await rentalRepository.deleteRental(id)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}