import { Router } from "express"
import { addRental, deleteRental, listRentals, returnRental } from "../Controllers/rentalsController.js"
import { rentalValidation, queryValidation } from "../Middlewares/index.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", rentalValidation, addRental)
rentalsRouter.get("/rentals", queryValidation, listRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter