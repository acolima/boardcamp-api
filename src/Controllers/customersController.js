import { customerRepository } from "../Repositories/index.js"

export async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body

  try {
    const searchCustomer = await customerRepository.searchCustomer(cpf)
    if (searchCustomer.rowCount !== 0)
      return res.status(409).send("Cliente já cadastrado")

    const newCustomer = { name, phone, cpf, birthday }
    await customerRepository.addCustomer(newCustomer)

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
    const { rows: customers } = await customerRepository.getCustomers(
      cpf, offset, limit, order
    )

    res.send(customers)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export async function searchCustomerId(req, res) {
  const { id } = req.params

  try {
    const { rows: customer } = await customerRepository.getCustomerById(id)
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
    const { rows: searchId } = await customerRepository.getCustomerById(id)
    if (searchId.length === 0)
      return res.sendStatus(404)

    const searchCustomer = await customerRepository.getCustomerByCpf(cpf)
    if (searchCustomer.rowCount !== 0)
      if (searchCustomer.rows[0].id !== parseInt(id))
        return res.sendStatus(409)

    const toUpdateCustomer = { nome, phone, cpf, birthday, id }
    await customerRepository.updateCustomer(toUpdateCustomer)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}