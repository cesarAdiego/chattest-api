import { Body, Controller, Get, Post, Param, HttpService } from '@nestjs/common';
import { ProjectConfiguration } from 'src/common/entities/projectConfiguration';
import { Test } from 'src/common/entities/test';
import { TestExecutionResult } from 'src/common/entities/testExecutionResult';
import { TestExecutionResultModel } from 'src/common/models/testExecutionResultModel';
import { TestExecutionService } from 'src/common/services/test-execution/test-execution.service';
import { TestContent } from 'src/schemas/testContent.schema';
import { TestContentService } from '../../../../common/services/test-content.service';

@Controller('test-content')
export class TestContentController {
    constructor(private testContentService: TestContentService,
                private testExecutionService: TestExecutionService,
                private http: HttpService) {}

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

    @Post('execute')
    async executeById(@Body() test: Test): Promise<TestExecutionResultModel> {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        let configurationResponse = await this.http.get<ProjectConfiguration>(`https://localhost:44344/api/Projects/${test.projectId}/configuration`).toPromise();
        let configuration = configurationResponse.data;
        let testContent = await this.testContentService.getByTestId(test.id);

        let executionResult = await this.testExecutionService.executeTest(testContent, configuration);
        let result = new TestExecutionResultModel(executionResult);
        console.log(JSON.stringify(result));
        return result;
    }
}
