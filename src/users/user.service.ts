import { ResponseInterface } from 'src/global-interface/global-interface.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { hash, compare } from 'bcrypt'
import strings from 'src/constanst/strings'
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseInterface> {
    const saltPassword = await hash(createUserDto.password, 10)
    try {
      await this.userModel.create({
        ...createUserDto,
        password: saltPassword,
      })
      return { msg: 'User Created', data: 'User Created', success: true }
    } catch (error) {
      console.log(error)
      return {
        msg: 'an error has occurred',
        data: 'an error has occurred',
        success: false,
      }
    }
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec()
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec()
  }

  async getUserData(token: string): Promise<ResponseInterface> {
    const userData = verify(token, strings.secret)
    if (userData) {
      return {
        msg: 'User loged in',
        data: userData,
        success: true,
      }
    } else {
      return {
        msg: 'an error has occurred',
        data: 'an error has occurred',
        success: false,
      }
    }
  }

  async login(email: string, password: string): Promise<ResponseInterface> {
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
        return {
          msg: 'User loged in',
          data: {
            token: token,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
          },
          success: true,
        }
      } else {
        return { msg: 'Wrong data', data: 'Wrong data', success: false }
      }
    } catch (error) {
      console.error('[error]' + error)
      return {
        msg: 'an error has occurred',
        data: 'an error has occurred',
        success: false,
      }
    }
  }
}
