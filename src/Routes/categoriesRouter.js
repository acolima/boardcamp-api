import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { categoryValidation } from "../Middlewares/index.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", listCategories)
categoriesRouter.post("/categories", categoryValidation, addCategory)

export default categoriesRouter