import { Router } from "express"
import { addCustomer } from "../Controllers/customersController.js"
import { customerValidation } from "../Middlewares/index.js"

const customersRouter = Router()

customersRouter.post("/customers", customerValidation, addCustomer)

export default customersRouter