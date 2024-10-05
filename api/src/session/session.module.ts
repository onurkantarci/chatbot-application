import { Module, Session } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './session.schema';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
