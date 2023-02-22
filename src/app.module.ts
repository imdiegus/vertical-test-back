import { AuthMiddleware } from './middlewares/auth.middleware'
import { Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/user.module'
import { EmailModule } from './email/email.module'
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://diegoww3:huqZlOCX5NL63uP1@cluster0.2ajyqkw.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('email')
  }
}
