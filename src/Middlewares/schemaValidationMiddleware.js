import { stripHtml } from "string-strip-html"

export function schemaValidation(schema) {
  return (req, res, next) => {
    const body = sanitizeInput(req.body)

    const validation = schema.validate(body)
    if (validation.error)
      return res.status(400).send("O campo não pode ser vazio")

    next()
  }
}

function sanitizeInput(body) {
  Object.keys(body).forEach(property => {
    if (typeof body[property] !== 'number')
      body[property] = stripHtml(body[property]).result.trim()
  })
  return body
}