import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from './message.schema';

export type UserMessageDocument = UserMessage & Document;

Schema()
export class UserMessage extends Message {
    @Prop()
    botAnswers: Message[];
}

export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);