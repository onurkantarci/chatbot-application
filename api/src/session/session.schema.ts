import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

export interface Message {
  role: string;
  content: string;
}

@Schema()
export class Session {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: false })
  endTime: Date;

  @Prop({ default: [] })
  messages: Message[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
