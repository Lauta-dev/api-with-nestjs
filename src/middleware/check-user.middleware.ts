import { Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreateConnectionMidleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { title, genre, release } = req.body
    if (title && genre && release) {
      return next()
    }

    res.json({
      "no": "no"
    })

  }
}
