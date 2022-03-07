import { Router } from "express"
import { addCustomer, listCustomers, searchCustomerId, updateCustomer } from "../Controllers/customersController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import customerSchema from "../Schemas/customerSchema.js"

const customersRouter = Router()

customersRouter.post("/customers", schemaValidation(customerSchema), addCustomer)
customersRouter.get("/customers", queryValidation, listCustomers)
customersRouter.get("/customers/:id", searchCustomerId)
customersRouter.put("/customers/:id", schemaValidation(customerSchema), updateCustomer)

export default customersRouter