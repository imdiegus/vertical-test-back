import { Email, EmailSchema } from './schemas/email.schema'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
