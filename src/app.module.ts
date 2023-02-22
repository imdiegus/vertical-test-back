import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/user.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://diegoww3:huqZlOCX5NL63uP1@cluster0.2ajyqkw.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
