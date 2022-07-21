import { Router } from "express"
import { addGame, listGames } from "../Controllers/gamesController.js"
import { queryValidation, schemaValidation } from "../Middlewares/index.js"
import gameSchema from "../Schemas/gameSchema.js"

const gamesRouter = Router()

gamesRouter.post("/", schemaValidation(gameSchema), addGame)
gamesRouter.get("/", queryValidation, listGames)

export default gamesRouter