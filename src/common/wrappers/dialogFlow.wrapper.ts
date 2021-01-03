import { TestContentController } from "src/features/test-content/controllers/test-content/test-content.controller";
import { TestContent } from "src/schemas/testContent.schema";

import { SessionsClient } from '@google-cloud/dialogflow';
import { UserMessage } from "src/schemas/userMessage.schema";
import { TestExecutionResult } from "../entities/testExecutionResult";
import { Message } from "src/schemas/message.schema";
import { BotAnswerExecutionResult } from "../entities/botAnswerExecutionResult";

export class DialogFlowWrapper {
    projectId: string;
    testContent: TestContent;
    sessionClient: any;

    constructor(projectId: string, testContent: TestContent) {
        this.projectId = projectId;
        this.testContent = testContent;
        this.sessionClient = new SessionsClient();
    }

    async executeTest(): Promise<TestExecutionResult> {
        let allExpectedAnswers = this.testContent.UserMessages.map(message => message.BotAnswers);
        let expectedAnswers: Message[] = [].concat(...allExpectedAnswers);
        let botAsnwers = await this.SendAndReceiveMessages(this.testContent.UserMessages);

        let testExecutionResult = new TestExecutionResult(expectedAnswers, botAsnwers);

        return testExecutionResult;
    }

    async detectIntent(userMessage: UserMessage): Promise<any> {
        let sessionId = Math.random()*1000;
        let sessionPath = this.sessionClient.projectAgentSessionPath(this.projectId, sessionId);

        let request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: userMessage.Content,
                    languageCode: 'es-ES'
                }
            }
        };

        let responses = await this.sessionClient.detectIntent(request);

        return responses[0];
    }

    async SendAndReceiveMessages(userMessages: UserMessage[]): Promise<string[]> {
        let receivedMessages: string[] = [];

        userMessages.forEach(async message => {
            try {
                let response = await this.detectIntent(message);

                receivedMessages.push(response.queryResult.fulfillmentText);
            } catch(error) {
                console.log(error);
            }
        });

        return receivedMessages;
    }
}