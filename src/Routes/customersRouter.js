import { Router } from "express"
import { addCustomer, listCustomers, searchCustomerId, updateCustomer } from "../Controllers/customersController.js"
import { customerValidation } from "../Middlewares/index.js"

const customersRouter = Router()

customersRouter.post("/customers", customerValidation, addCustomer)
customersRouter.get("/customers", listCustomers)
customersRouter.get("/customers/:id", searchCustomerId)
customersRouter.put("/customers/:id", customerValidation, updateCustomer)

export default customersRouter