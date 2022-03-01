import { Router } from "express"
import { addCategory, listCategories } from "../Controllers/categoriesController.js"
import { categoriesValidation } from "../Middlewares/index.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", listCategories)
categoriesRouter.post("/categories", categoriesValidation, addCategory)

export default categoriesRouter