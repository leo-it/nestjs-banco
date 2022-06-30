import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './product/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/users-nest', {
      useNewUrlParser: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
