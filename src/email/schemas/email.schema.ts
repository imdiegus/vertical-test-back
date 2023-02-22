import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type EmailDocument = HydratedDocument<Email>
export type EmailFromClient = Omit<Email, 'time'>

@Schema()
export class Email {
  @Prop({ type: [String], required: true })
  to: string[]
  @Prop({ type: String, required: true })
  message: string
  @Prop({ type: String, required: true })
  time: string
  @Prop({ type: String, required: true })
  from: string
  @Prop({ type: String, required: true })
  subject: string
}
export const EmailSchema = SchemaFactory.createForClass(Email)
