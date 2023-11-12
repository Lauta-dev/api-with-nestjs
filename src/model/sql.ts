import { CreateConnection } from "src/interface/createConnection.interface";
import { Movie } from "src/interface/movie.interface"
import { UpdateAnItem } from "src/interface/updateMovie.interface";
import { connection } from "src/seed"

const createConnection = async ({ sql, parameter }: CreateConnection) => {
  try {
    const connect = await connection()
    const query = {
      text: sql,
      values: parameter,
    }

    const res = await connect.query(query)
      ; (await connection()).end

    return res.rows
  } catch (error) {
    console.log(error)
  }
}

export class ModelSql {
  async getAllMovies() {
    const sql = "SELECT titulo, año_lanzamiento AS lanzamiento, genero FROM peliculas"
    const result = createConnection({ sql })
    return result

  }

  async createMovie({ data }: { data: Movie }) {
    // Formato en que debe llegar -> [ 'Mortal Kombat: Scorpion Revenge', 'Horror, Gore', 2020 ]
    const newData: Array<String | Number> = Object.values(data)
    const sql = "INSERT INTO peliculas (titulo, genero, año_lanzamiento) VALUES ($1, $2, $3)"

    createConnection({ sql, parameter: newData })
  }

  async deleteMovie({ id }: { id: number }) {
    const sql = "DELETE FROM peliculas WHERE id = $1"
    const selectAll = "SELECT titulo AS Titulo, año_lanzamiento AS asd, genero AS Genero FROM peliculas WHERE id = $1"

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

    const up: { [key: string]: any } = {};

    Object.keys(body).forEach(key => {
      body[key] !== null && body[key] !== undefined && body[key] !== 'id' ? up[key] = body[key] : null
    })

    const index: { keys: String, values: (String | Number)[], id: Number } = {
      keys: Object.keys(up).map((key, index) => `${key} = $${index + 1}`).join(', '),
      values: Object.values(up),
      id: Object.keys(up).length + 1
    }

    const sql = `UPDATE peliculas
                 SET ${index.keys}
                 WHERE id = $${index.id}`

    const selectMovie = "SELECT * FROM peliculas WHERE id = $1"

    const v = [...index.values, body.id]

    const result = createConnection({ sql: selectMovie, parameter: [body.id] })
    createConnection({ sql, parameter: v})

    return result
  }
}
