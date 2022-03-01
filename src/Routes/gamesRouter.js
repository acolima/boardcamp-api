import { Router } from "express"
import { addGame, listGames } from "../Controllers/gamesController.js"
import { gamesValidation } from "../Middlewares/gamesValidationMiddleware.js"

const gamesRouter = Router()

gamesRouter.post("/games", gamesValidation, addGame)
gamesRouter.get("/games", listGames)

export default gamesRouter