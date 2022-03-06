import { Router } from "express"
import { addRental, deleteRental, listRentals, returnRental } from "../Controllers/rentalsController.js"
import { rentalValidation } from "../Middlewares/index.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", rentalValidation, addRental)
rentalsRouter.get("/rentals", listRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter