import { Controller, Get, Param } from '@nestjs/common';
import { TestContent } from 'src/schemas/testContent.schema';
import { TestContentService } from '../../services/test-content/test-content.service';

@Controller('test-content')
export class TestContentController {
    constructor(private testContentService: TestContentService) {}

    @Get()
    async getAll(): Promise<TestContent[]> {
        let testContents = await this.testContentService.getAll();
        console.log(testContents);

        return testContents;
    }

    @Get(':id')
    async getById(@Param('id') testId: number): Promise<TestContent> {
        console.log(testId);
        let testContent = await this.testContentService.getByTestId(testId);
        console.log(testContent);
        
        return testContent;
    }
}
