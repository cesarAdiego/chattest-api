import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestContent, TestContentSchema } from 'src/schemas/testContent.schema';
import { TestContentController } from './controllers/test-content/test-content.controller';
import { TestContentService } from './services/test-content/test-content.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'tests', schema: TestContentSchema}])],
    controllers: [TestContentController],
    providers: [TestContentService]
})
export class TestContentModule {}
