import connection from "../db.js"
import customerSchema from "../Schemas/customerSchema.js"

export async function customerValidation(req, res, next) {
  const customer = req.body

  const validation = customerSchema.validate(customer)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  // Fazer a validação da data

  try {
    const { rows: customerExists } = await connection.query('SELECT id FROM customers WHERE cpf=$1', [customer.cpf])
    if (customerExists.length !== 0)
      return res.status(409).send("Cliente já cadastrado")
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

  res.locals.customer = customer

  next()
}