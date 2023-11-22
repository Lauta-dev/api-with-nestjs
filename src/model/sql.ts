import { CreateConnection } from "src/interface/createConnection.interface";
import { Movie } from "src/interface/movie.interface"
import { UpdateAnItem } from "src/interface/updateMovie.interface";
import { connection } from "src/seed"

const createConnection = async ({ sql, parameter }: CreateConnection) => {
  try {
    const connect = await connection()
        

    const res = await connect.query(sql, parameter)
      ; (await connection()).end

    return res.rows
  } catch (error) {
    console.log(error)
  }
}

export class ModelSql {
  async getAllMovies() {
    const sql = `SELECT game.game_title AS title, users.user_handle AS user,
                        TO_CHAR(game.game_release, 'YYYY-MM-DD') AS release,
                        COUNT(game.game_release) AS stock
                 FROM game
                 JOIN users ON game.user_id = users.user_id
                 GROUP BY game_title, game_release, users.user_handle`
    const result = createConnection({ sql })
    return result
  }

  async createMovie({ data }: { data: Movie }) {
    // TODO -> Crear un formato similar al de hacer un update a una pelicula
    const newData: Array<String | Number> = Object.values(data)
    const sql = "INSERT INTO peliculas (titulo, genero, año_lanzamiento) VALUES ($1, $2, $3)"

    createConnection({ sql, parameter: newData })
  }

  async deleteMovie({ id }: { id: number }) {
    const sql = "DELETE FROM game WHERE game_id = $1"
    const selectAll = "SELECT game_title FROM game WHERE id = $1"

    const result = createConnection({ sql: selectAll, parameter: [id] })
    createConnection({ sql, parameter: [id] })

    return result
  }

  async updateMovie({ body }: { body: UpdateAnItem }) {
    const { id, title } = body

    if (id === null || id === undefined && (typeof id !== 'number' && id < 0)) {
      return
    }

    if (title === null || title === undefined && (typeof title !== 'string' || title.length < 1 || title.length > 75)) {
      return
    }

    // TODO: Modularizar este trozo de código

    const up: { [key: string]: any } = {};

    // Evita que hayan elementos null o undefined
    Object.keys(body).forEach(key => {
      body[key] !== null && body[key] !== undefined && body[key] !== 'id' ? up[key] = body[key] : null
    })

    const index = {
      // Este crea un STRING con este formato: title = $1, genre = $2
      keysSQLFormat: Object.keys(up).map((key, index) => `${key} = $${index + 1}`).join(', '),

      // Obtiene los valores del objeto y los transforma en un array
      values: Object.values(up),

      // Crea un formato similar a este: id = $3
      idSQLFormat: `$${Object.keys(up).length + 1}`
    }

    // Fin todo
    
    const sql = `UPDATE peliculas
                 SET ${index.keysSQLFormat}
                 WHERE id = ${index.idSQLFormat}`

    const selectMovie = "SELECT * FROM peliculas WHERE id = $1"

    const v = [...index.values, body.id]


    const result = createConnection({ sql: selectMovie, parameter: [body.id] })
    createConnection({ sql, parameter: v})

    return result
  }
}
