import { Injectable } from '@nestjs/common';
import { ProjectConfiguration } from 'src/common/entities/projectConfiguration';
import { TestExecutionResult } from 'src/common/entities/testExecutionResult';
import { CognigyWrapper } from 'src/common/wrappers/cognigy.wrapper';
import { DialogFlowWrapper } from 'src/common/wrappers/dialogFlow.wrapper';
import { TestContent } from 'src/schemas/testContent.schema';

@Injectable()
export class TestExecutionService {
    constructor() {}

    async executeTest(testContent: TestContent, configuration: ProjectConfiguration): Promise<TestExecutionResult> {
        let testResult: TestExecutionResult;
        
        if (configuration.cognigyConfiguration != undefined) {
            let cognigyWrapper = new CognigyWrapper(configuration.cognigyConfiguration.configUrl, testContent);
            testResult = await cognigyWrapper.executeTest();
        }
        else if (configuration.dialogFlowConfiguration != undefined) {
            let dialogflowWrapper = new DialogFlowWrapper(configuration.dialogFlowConfiguration.projectId, testContent);
            testResult = await dialogflowWrapper.executeTest();
        }

        return testResult;
    }
}
