import express from "express"
import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const { Pool } = pg

//const connection = new Pool(process.env.DATABASE_URL)

const server = express()

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})