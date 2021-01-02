import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestContentSchema } from 'src/schemas/testContent.schema';
import { TestContentController } from './controllers/test-content/test-content.controller';
import { TestContentService } from '../../common/services/test-content.service';
import { TestExecutionService } from 'src/common/services/test-execution/test-execution.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'tests', schema: TestContentSchema}]), HttpModule],
    controllers: [TestContentController],
    providers: [TestContentService, TestExecutionService]
})
export class TestContentModule {}
