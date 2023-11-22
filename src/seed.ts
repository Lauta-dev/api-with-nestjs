import { Client } from 'pg'

export const connection = async () => {
  const newClient = new Client({
    database: 'lau',
    user: 'postgres',
    port: 5432
  })

  await newClient.connect()

  const rows = await newClient.query('SELECT * FROM game;')
  console.log(rows.rows)


  return newClient
}

