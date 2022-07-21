import { Router } from "express"
import { addRental, deleteRental, listRentals, returnRental } from "../Controllers/rentalsController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import rentalSchema from "../Schemas/rentalSchema.js"

const rentalsRouter = Router()

rentalsRouter.post("/", schemaValidation(rentalSchema), addRental)
rentalsRouter.get("/", queryValidation, listRentals)
rentalsRouter.post("/:id/return", returnRental)
rentalsRouter.delete("/:id", deleteRental)

export default rentalsRouter