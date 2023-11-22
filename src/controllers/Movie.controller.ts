import { Body, Controller, Delete, Get, Patch, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UpdateAnItem } from "src/interface/updateMovie.interface";
import { ModelSql } from "src/model/sql";

@Controller()
export class MovieController {

  @Get()
  async getAll(@Res() res: Response) {
    const data = await new ModelSql().getAllMovies()
    return res.json(data)
  }

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    const { title, genre, release } = req.body

    if (
      typeof title !== 'string' ||
      typeof genre !== 'string' ||
      typeof release !== 'number'
    ) {
      return res.json({ "msj": "Algún dato esta mal escrito", result: req.body })
    }
    await new ModelSql().createMovie({ data: req.body })

    res.json(req.body)
  }

  @Delete('delete')
  async delete(@Body() body: { id: number }, @Res() res: Response) {
    const { id } = body
    const result = await new ModelSql().deleteMovie({ id })

    if (result.length) {
      return res.json({
        message: "Elemento eliminado",
        result
      })
    }

    return res.json({
      message: "El elemento no se encuentra en la DB"
    })
  }

  @Patch('update')
  async update(@Body() body: UpdateAnItem, @Res() res: Response) {
    const { id, title } = body

    if (id === null || id === undefined && (typeof id !== 'number' && id < 0)) {
      res.status(400).json({ message: 'El id está mal' })
      return
    }

    if (title === null || title === undefined && (typeof title !== 'string' || title.length < 1 || title.length > 75)) {
      res.status(400).json({ message: 'El title está mal' })
      return
    }

    const result = await new ModelSql().updateMovie({ body })
    res.json(result)
  }

}
