import querySchema from "../Schemas/querySchema.js"

export function queryValidation(req, res, next) {
  const query = {
    cpf: req.query.cpf,
    limit: req.query.limit,
    offset: req.query.offset,
    name: req.query.name,
    customerId: req.query.customerId,
    gameId: req.query.gameId
  }

  const validation = querySchema.validate(query)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  res.locals.query = query

  next()
}