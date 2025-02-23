import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mongodb'),
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
