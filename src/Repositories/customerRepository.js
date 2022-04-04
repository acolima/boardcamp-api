import connection from "../db.js"

async function addCustomer(newCustomer) {
  const { name, phone, cpf, birthday } = newCustomer
  return connection.query(`
    INSERT INTO customers 
      (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4)
  `, [name, phone, cpf, birthday])
}

async function getCustomers(cpf, offset, limit, order) {
  return connection.query(`
    SELECT * FROM customers
    ${cpf}
    ${offset}
    ${limit}
    ${order}
  `)
}

async function getCustomerById(id) {
  return connection.query(`
    SELECT * FROM customers WHERE id=$1
  `, [id])
}

async function getCustomerByCpf(cpf) {
  return connection.query(`
    SELECT * FROM customers WHERE cpf = $1
  `, [cpf])
}

async function updateCustomer(update) {
  const { name, phone, cpf, birthday, id } = update
  return connection.query(`
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5
  `, [name, phone, cpf, birthday, id])
}

export const customerRepository = {
  addCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByCpf,
  updateCustomer
}