import { Injectable } from '@nestjs/common';
import { CognigyWrapper } from 'src/common/wrappers/cognigy.wrapper';
import { TestContent } from 'src/schemas/testContent.schema';

@Injectable()
export class TestExecutionService {
    constructor() {}

    async executeTest(testContent: TestContent) {
        let cognigyWrapper = new CognigyWrapper('', testContent);

        return await cognigyWrapper.executeTest();
    }
}
