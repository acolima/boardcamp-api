import { Router } from "express"
import { addGame, listGames } from "../Controllers/gamesController.js"
import { gameValidation } from "../Middlewares/gameValidationMiddleware.js"
import { queryValidation } from "../Middlewares/queryValidationMiddleware.js"

const gamesRouter = Router()

gamesRouter.post("/games", gameValidation, addGame)
gamesRouter.get("/games", queryValidation, listGames)

export default gamesRouter