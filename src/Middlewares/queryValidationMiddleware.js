import querySchema from "../Schemas/querySchema.js"
import SqlString from 'sqlstring'

export function queryValidation(req, res, next) {
  const query = {
    cpf: req.query.cpf,
    limit: req.query.limit,
    offset: req.query.offset,
    name: SqlString.escape(req.query.name),
    customerId: req.query.customerId,
    gameId: req.query.gameId,
    order: SqlString.escape(req.query.order),
    desc: req.query.desc,
    status: SqlString.escape(req.query.status),
    startDate: SqlString.escape(req.query.startDate)
  }

  const validation = querySchema.validate(query)
  if (validation.error) {
    console.error(validation.error.details[0].message)
    return res.status(400).send("Os dados devem ser preenchidos corretamente")
  }

  res.locals.query = query

  next()
}