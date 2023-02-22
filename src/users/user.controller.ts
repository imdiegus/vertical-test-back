import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<string> {
    return this.userService.login(body.email, body.password)
  }
}
