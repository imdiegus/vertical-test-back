import { ResponseInterface } from 'src/global-interface/global-interface.interface'
import { CreateEmailDto } from './dtop/email.dto'
import { Email, EmailDocument } from './schemas/email.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private readonly emailModel: Model<EmailDocument>,
  ) {}

  async create(createEmailDto: CreateEmailDto): Promise<ResponseInterface> {
    try {
      const createdEmail = await this.emailModel.create(createEmailDto)
      return {
        success: true,
        msg: 'Email Sent',
        data: createdEmail,
      }
    } catch (error) {
      console.log('[error]' + error)
      return {
        success: false,
        msg: 'An error occured',
        data: '',
      }
    }
  }

  async getEmails(email: string): Promise<ResponseInterface> {
    try {
      const emails = await this.emailModel.aggregate([
        {
          $match: {
            $or: [{ from: email }, { to: email }],
          },
        },
      ])
      return {
        success: true,
        msg: 'Emails returned',
        data: emails,
      }
    } catch (error) {
      console.log('[error]' + error)
      return {
        success: false,
        msg: 'An error occured',
        data: '',
      }
    }
  }
}
