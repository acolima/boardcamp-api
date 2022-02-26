import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { categoriesValidationMiddleware } from "../Middlewares/index.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", listCategories)
categoriesRouter.post("/categories", categoriesValidationMiddleware, addCategory)

export default categoriesRouter