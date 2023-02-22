import { Request } from 'express'
import { IncomingHttpHeaders } from 'http'
import { EmailDocument } from './../email/schemas/email.schema'
export interface ResponseInterface {
  success: boolean
  msg: string
  data: string | EmailDocument | EmailDocument[]
}
export interface CustomRequest<TBody, THeader> extends Request {
  body: TBody
  headers: IncomingHttpHeaders & THeader
}
export interface AuthorizationInterface {
  Authorization: string
}
