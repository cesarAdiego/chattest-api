import { Controller, Get, Param } from '@nestjs/common';
import { TestExecutionService } from 'src/common/services/test-execution/test-execution.service';
import { TestContent } from 'src/schemas/testContent.schema';
import { TestContentService } from '../../../../common/services/test-content.service';

@Controller('test-content')
export class TestContentController {
    constructor(private testContentService: TestContentService,
                private testExecutionService: TestExecutionService) {}

    @Get()
    async getAll(): Promise<TestContent[]> {
        let testContents = await this.testContentService.getAll();
        return testContents;
    }

    @Get(':id')
    async getById(@Param('id') testId: number): Promise<TestContent> {
        let testContent = await this.testContentService.getByTestId(testId);
        
        return testContent;
    }

    @Get('execute/:id')
    async executeById(@Param('id') testId: number): Promise<boolean> {
        let testContent = await this.testContentService.getByTestId(testId);

        return await this.testExecutionService.executeTest(testContent);
    }
}
