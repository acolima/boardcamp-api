import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { categoryValidation, queryValidation } from "../Middlewares/index.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", queryValidation, listCategories)
categoriesRouter.post("/categories", categoryValidation, addCategory)

export default categoriesRouter