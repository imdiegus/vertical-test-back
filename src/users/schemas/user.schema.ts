import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
export type TokenUser = Omit<UserDocument, 'password'>

@Schema()
export class User {
  @Prop({ type: String, required: true })
  email: string
  @Prop({ type: String, required: true })
  password: string
  @Prop({ type: String, required: true })
  firstName: string
  @Prop({ type: String, required: true })
  lastName: string
}
export const UserSchema = SchemaFactory.createForClass(User)
