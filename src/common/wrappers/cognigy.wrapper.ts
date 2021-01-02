import { WebchatClient } from "@cognigy/webchat-client";
import { reverse } from "dns";
import { Message } from "src/schemas/message.schema";
import { TestContent } from "src/schemas/testContent.schema";
import { UserMessage } from "src/schemas/userMessage.schema";
import { TestExecutionResult } from "../entities/testExecutionResult";

export class CognigyWrapper {
    botUrl: string;
    testContent: TestContent;
    client: WebchatClient;

    constructor(botUrl: string, testContent: TestContent) {
        this.botUrl = botUrl;
        this.testContent = testContent;
        this.client = new WebchatClient(this.botUrl, {
            forceWebsockets: true
        });
    }

    async executeTest(): Promise<TestExecutionResult> {
        await this.connect();
        let allExpectedAnswers = this.testContent.UserMessages.map(message => message.BotAnswers);
        let expectedAnswers: Message[] = [].concat(...allExpectedAnswers);
        let botAnswers = await this.SendAndReceiveMessages(this.testContent.UserMessages); 

        let testExecution = new TestExecutionResult(expectedAnswers, botAnswers); 

        return testExecution;
    }

    async connect() {
        await this.client.connect();
    }

    SendAndReceiveMessages(userMessages: UserMessage[]): Promise<string[]>{
        return new Promise<string[]>((resolve, reject) => {
            let botAnswersCount = userMessages.map(message => message.BotAnswers.length)
                                             .reduce((a, b) => a + b, 0);
            let receivedMessages: string[] = [];

            userMessages.forEach(message => this.client.sendMessage(message.Content));

            this.client.on('output', output => {
                receivedMessages.push(output.text);
                if(receivedMessages.length == botAnswersCount) {
                    resolve(receivedMessages);
                }
            });
        });
    }
}