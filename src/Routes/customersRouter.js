import { Router } from "express"
import { addCustomer, listCustomers, searchCustomerId, updateCustomer } from "../Controllers/customersController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import customerSchema from "../Schemas/customerSchema.js"

const customersRouter = Router()

customersRouter.post("/", schemaValidation(customerSchema), addCustomer)
customersRouter.get("/", queryValidation, listCustomers)
customersRouter.get("/:id", searchCustomerId)
customersRouter.put("/:id", schemaValidation(customerSchema), updateCustomer)

export default customersRouter