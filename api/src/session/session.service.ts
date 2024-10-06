import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, Session, SessionDocument } from './session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async create(name: string): Promise<Session> {
    const newSession = new this.sessionModel({
      name,
      startTime: new Date().toISOString(),
    });
    return newSession.save();
  }

  async addMessage(name: string, message: Message): Promise<Session> {
    return this.sessionModel
      .findOneAndUpdate(
        { name },
        { $push: { messages: message } },
        { new: true },
      )
      .exec();
  }

  async exists(name: string): Promise<boolean> {
    const session = await this.sessionModel.findOne({ name }).exec();
    return !!session;
  }

  async endSession(name: string): Promise<Session> {
    return this.sessionModel
      .findOneAndUpdate(
        { name },
        { endTime: new Date().toISOString() },
        { new: true },
      )
      .exec();
  }
}
