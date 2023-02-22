import { Injectable, NestMiddleware } from '@nestjs/common'
import strings from '../constanst/strings'
import { NextFunction, Response } from 'express'
import { CustomRequest } from 'src/global-interface/global-interface.interface'
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(
    req: CustomRequest<any, { authorization: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const Authorization = req.headers.authorization
    try {
      verify(Authorization, strings.secret)
      next()
    } catch (error) {
      console.log('[error]' + error)
      return res.send({
        success: false,
        msg: 'unauthorized',
        data: '',
      })
    }
  }
}
