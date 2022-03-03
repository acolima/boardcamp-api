import customerSchema from "../Schemas/customerSchema.js"
import { stripHtml } from "string-strip-html"

export async function customerValidation(req, res, next) {
  const customer = {
    name: stripHtml(req.body.name).result.trim(),
    phone: stripHtml(req.body.phone).result.trim(),
    cpf: stripHtml(req.body.cpf).result.trim(),
    birthday: stripHtml(req.body.birthday).result.trim()
  }

  const validation = customerSchema.validate(customer)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  // Fazer a validação da data

  res.locals.customer = customer

  next()
}