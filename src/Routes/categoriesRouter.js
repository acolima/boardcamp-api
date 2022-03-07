import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import categorySchema from "../Schemas/categorySchema.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", queryValidation, listCategories)
categoriesRouter.post("/categories", schemaValidation(categorySchema), addCategory)

export default categoriesRouter