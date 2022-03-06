import { Router } from "express"
import { addCustomer, listCustomers, searchCustomerId, updateCustomer } from "../Controllers/customersController.js"
import { customerValidation, queryValidation } from "../Middlewares/index.js"

const customersRouter = Router()

customersRouter.post("/customers", customerValidation, addCustomer)
customersRouter.get("/customers", queryValidation, listCustomers)
customersRouter.get("/customers/:id", searchCustomerId)
customersRouter.put("/customers/:id", customerValidation, updateCustomer)

export default customersRouter