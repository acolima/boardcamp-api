import { Router } from "express"
import { addRental, listRentals } from "../Controllers/rentalsController.js"
import { rentalValidation } from "../Middlewares/index.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", rentalValidation, addRental)
rentalsRouter.get("/rentals", listRentals)

export default rentalsRouter