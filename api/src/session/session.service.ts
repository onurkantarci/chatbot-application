import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async create(name: string): Promise<Session> {
    const newSession = new this.sessionModel({
      name,
      startTime: new Date(),
    });
    return newSession.save();
  }

  async endSession(name: string): Promise<Session> {
    return this.sessionModel
      .findOneAndUpdate({ name }, { endTime: new Date() }, { new: true })
      .exec();
  }
}
