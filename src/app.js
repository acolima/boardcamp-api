import "./setup.js"
import express, { json } from "express"
import cors from "cors"
import router from "./Routes/index.js"

const server = express()

server.use(cors())
server.use(json())

server.use(router)

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})