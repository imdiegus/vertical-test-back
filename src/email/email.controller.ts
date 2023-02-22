import { EmailFromClient } from './schemas/email.schema'
import { CreateEmailDto } from './dtop/email.dto'
import { EmailService } from './email.service'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ResponseInterface } from 'src/global-interface/global-interface.interface'
import { DateTime } from 'luxon'

@Controller('email')
export class EmailController {
  constructor(private readonly emailServie: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() emailFromClient: EmailFromClient,
  ): Promise<ResponseInterface> {
    const createEmailDto: CreateEmailDto = {
      ...emailFromClient,
      time: DateTime.now(),
    }
    return await this.emailServie.create(createEmailDto)
  }

  @Get(':email')
  async getEmails(@Param() params): Promise<ResponseInterface> {
    return await this.emailServie.getEmails(params.email)
  }
}
