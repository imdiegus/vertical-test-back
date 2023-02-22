import { CreateUserDto } from './dto/create-user.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import strings from 'src/constanst/strings'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const saltPassword = await hash(createUserDto.password, 10)
    try {
      await this.userModel.create({
        ...createUserDto,
        password: saltPassword,
      })
      return 'User Created'
    } catch (error) {
      console.log(error)
      return 'an error has occurred'
    }
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec()
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec()
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const res = await this.findByEmail(email)
      const correctPassword = await compare(password, res.password)
      if (correctPassword) {
        const token = sign(
          {
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
          },
          strings.secret,
          { expiresIn: '8h' },
        )
        return token
      } else {
        return 'Wrong data'
      }
    } catch (error) {
      console.error('[error]' + error)
      return 'wrong Data'
    }
  }
}
