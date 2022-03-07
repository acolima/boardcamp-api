import joi from "joi"

const querySchema = joi.object({
  cpf: joi.number(),
  limit: joi.number(),
  offset: joi.number(),
  name: joi.string(),
  customerId: joi.number(),
  gameId: joi.number(),
  order: joi.string(),
  desc: joi.string()
})

export default querySchema