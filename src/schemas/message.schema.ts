import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    Content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);