import { Router } from "express"
import { addRental } from "../Controllers/rentalsController.js"
import { rentalValidation } from "../Middlewares/index.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", rentalValidation, addRental)

export default rentalsRouter