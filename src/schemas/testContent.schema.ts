import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserMessage } from './userMessage.schema';

export type TestContentDocument = TestContent & Document;

@Schema()
export class TestContent {
    @Prop()
    TestId: number;

    @Prop()
    userMessages: UserMessage[]
}

export const TestContentSchema = SchemaFactory.createForClass(TestContent);