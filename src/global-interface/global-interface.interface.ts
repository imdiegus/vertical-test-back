import { JwtPayload } from 'jsonwebtoken'
import { UserDocument } from './../users/schemas/user.schema'
import { Request } from 'express'
import { IncomingHttpHeaders } from 'http'
import { EmailDocument } from './../email/schemas/email.schema'

export interface ResponseInterface {
  success: boolean
  msg: string
  data:
    | string
    | EmailDocument
    | EmailResponseInterface[]
    | LoginResponseData
    | JwtPayload
}
export interface EmailResponseInterface extends EmailDocument {
  to: string[]
  from: string
  subject: string
  message: string
  time: string
  fromData: UserDocument
  toData: UserDocument[]
}
export interface CustomRequest<TBody, THeader> extends Request {
  body: TBody
  headers: IncomingHttpHeaders & THeader
}
export interface LoginResponseData {
  token: string
  email: string
  firstName: string
  lastName: string
}
export interface AuthorizationInterface {
  Authorization: string
}
