import { Client } from 'pg'

export const connection = async () => {
  const newClient = new Client({
    database: 'lau',
    user: 'postgres',
    port: 5432
  })

  await newClient.connect()

  return newClient
}

