import { Router } from "express"
import { addGame, listGames } from "../Controllers/gamesController.js"
import { gameValidation } from "../Middlewares/gameValidationMiddleware.js"

const gamesRouter = Router()

gamesRouter.post("/games", gameValidation, addGame)
gamesRouter.get("/games", listGames)

export default gamesRouter