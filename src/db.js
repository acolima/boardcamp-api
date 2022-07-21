import pg from "pg"

const { Pool } = pg

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const connection = new Pool(databaseConfig)

export default connection