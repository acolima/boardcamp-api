import connection from "../db.js"

export async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body

  try {
    const searchCustomer = await connection.query(`
      SELECT id FROM customers WHERE cpf=$1
    `, [cpf])

    if (searchCustomer.rowCount !== 0)
      return res.status(409).send("Cliente já cadastrado")

    await connection.query(`
      INSERT INTO customers 
        (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4)
    `, [name, phone, cpf, birthday])

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function listCustomers(req, res) {
  const { query } = res.locals
  query.order = (query.order).replaceAll("'", "\"")

  let cpf = ''
  if (query.cpf) cpf = `WHERE cpf LIKE '${query.cpf}%'`

  let offset = ''
  if (query.offset) offset = `OFFSET ${query.offset}`

  let limit = ''
  if (query.limit) limit = `LIMIT ${query.limit}`

  let order = ''
  if (query.order && query.order !== 'NULL')
    if (query.desc) order = `ORDER BY ${query.order} DESC`
    else order = `ORDER BY ${query.order}`

  try {
    const { rows: customers } = await connection.query(`
      SELECT * FROM customers
      ${cpf}
      ${offset}
      ${limit}
      ${order}
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
      SELECT * FROM customers WHERE id=$1
    `, [id])

    if (customer.length === 0)
      return res.sendStatus(404)

    res.send(customer[0])
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params
  const { name, phone, cpf, birthday } = req.body

  try {
    const { rows: searchId } = await connection.query(`
      SELECT * FROM customers WHERE id=$1
    `, [id])

    if (searchId.length === 0)
      return res.sendStatus(404)

    const searchCustomer = await connection.query(`
      SELECT * FROM customers WHERE cpf=$1
    `, [cpf])

    if (searchCustomer.rowCount !== 0)
      if (searchCustomer.rows[0].id !== parseInt(id))
        return res.sendStatus(409)

    await connection.query(`
      UPDATE customers
        SET name=$1, phone=$2, cpf=$3, birthday=$4
      WHERE id=$5
    `, [name, phone, cpf, birthday, id])

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}