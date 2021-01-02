import { Injectable } from '@nestjs/common';
import { ProjectConfiguration } from 'src/common/entities/projectConfiguration';
import { TestExecutionResult } from 'src/common/entities/testExecutionResult';
import { CognigyWrapper } from 'src/common/wrappers/cognigy.wrapper';
import { TestContent } from 'src/schemas/testContent.schema';

@Injectable()
export class TestExecutionService {
    constructor() {}

    async executeTest(testContent: TestContent, configuration: ProjectConfiguration): Promise<TestExecutionResult> {
        let cognigyWrapper = new CognigyWrapper(configuration.cognigyConfiguration.configUrl, testContent);

        return await cognigyWrapper.executeTest();
    }
}
