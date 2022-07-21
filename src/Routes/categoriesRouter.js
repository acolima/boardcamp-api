import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import categorySchema from "../Schemas/categorySchema.js"

const categoriesRouter = Router()

categoriesRouter.get("/", queryValidation, listCategories)
categoriesRouter.post("/", schemaValidation(categorySchema), addCategory)

export default categoriesRouter