import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestContent, TestContentDocument } from 'src/schemas/testContent.schema';

@Injectable()
export class TestContentService {
    constructor(@InjectModel('tests') private testContentModel: Model<TestContentDocument>) {}

    async getByTestId(testId: number): Promise<TestContent> {
        console.log(this.testContentModel);
        return this.testContentModel.findOne({TestId: testId}).exec();
    }

    async getAll(): Promise<TestContent[]> {
        return this.testContentModel.find().exec();
    }
}
