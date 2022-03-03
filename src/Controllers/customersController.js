import connection from "../db.js"

export async function addCustomer(req, res) {
  const { customer } = res.locals

  try {
    const searchCustomer = await connection.query(`
      SELECT id FROM customers WHERE cpf=$1
    `, [customer.cpf])

    if (searchCustomer.rowCount !== 0)
      return res.status(409).send("Cliente já cadastrado")

    await connection.query(`
      INSERT INTO customers 
        (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4)
    `, [customer.name, customer.phone, customer.cpf, customer.birthday])

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function listCustomers(req, res) {
  const { cpf } = req.query

  try {
    if (cpf) {
      const { rows: customers } = await connection.query(`
        SELECT * FROM customers
        WHERE cpf LIKE $1
      `, [`${cpf}%`])
      return res.send(customers)
    }

    const { rows: customers } = await connection.query(`
      SELECT * FROM customers
    `)

    res.send(customers)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function searchCustomerId(req, res) {
  const { id } = req.params

  try {
    const { rows: customer } = await connection.query(`
      SELECT * FROM customers
      WHERE id=$1
    `, [id])

    if (customer.length === 0)
      return res.sendStatus(404)

    res.send(customer)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}