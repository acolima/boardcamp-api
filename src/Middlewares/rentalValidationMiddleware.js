import rentalSchema from "../Schemas/rentalSchema.js"

export function rentalValidation(req, res, next) {
  const rental = req.body

  const validation = rentalSchema.validate(rental)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  res.locals.rental = rental

  next()
}