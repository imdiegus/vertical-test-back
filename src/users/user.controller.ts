import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Post } from '@nestjs/common'
import { ResponseInterface } from 'src/global-interface/global-interface.interface'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseInterface> {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<ResponseInterface> {
    return this.userService.login(body.email, body.password)
  }
}
