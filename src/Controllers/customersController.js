import connection from "../db.js"

export async function addCustomer(req, res) {
  const { customer } = res.locals

  try {
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