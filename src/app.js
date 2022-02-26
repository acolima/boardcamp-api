import "./setup.js"
import express, { json } from "express"
import cors from "cors"
import router from "./Routes/index.js"

const server = express()

server.use(cors())
server.use(json())
server.use(router)

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})