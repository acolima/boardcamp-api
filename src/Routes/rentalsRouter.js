import { Router } from "express"
import { addRental, deleteRental, endRental, listRentals } from "../Controllers/rentalsController.js"
import { rentalValidation } from "../Middlewares/index.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", rentalValidation, addRental)
rentalsRouter.get("/rentals", listRentals)
rentalsRouter.post("/rentals/:id/return", endRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter