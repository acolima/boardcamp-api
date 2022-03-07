import { Router } from "express"
import { addRental, deleteRental, listRentals, returnRental } from "../Controllers/rentalsController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import rentalSchema from "../Schemas/rentalSchema.js"

const rentalsRouter = Router()

rentalsRouter.post("/rentals", schemaValidation(rentalSchema), addRental)
rentalsRouter.get("/rentals", queryValidation, listRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter