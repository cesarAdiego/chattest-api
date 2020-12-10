import { WebchatClient } from "@cognigy/webchat-client";
import { TestContent } from "src/schemas/testContent.schema";
import { PromiseController } from 'promise-controller';
import { UserMessage } from "src/schemas/userMessage.schema";
require('webchat-client');

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

    async executeTest(): Promise<boolean> {
        await this.connect();
        let receivedMessages: string[] = [];

        await this.testContent.userMessages.forEach(async userMessage => {
            receivedMessages.concat(await this.SendAndReceiveMessages(userMessage));
        });

        console.log(receivedMessages);

        return true;
    }

    async connect() {
        await this.client.connect();
    }

    async SendAndReceiveMessages(userMessage: UserMessage): Promise<string[]>{
        let promise = new Promise<string[]>((resolve, reject) => {
            let receivedMessages: string[] = [];
            this.client.on('output', output => {
                receivedMessages.push(output.text);

                if(receivedMessages.length == userMessage.botAnswers.length) {
                    resolve(receivedMessages);
                }
            });

            this.client.sendMessage(userMessage.content);
        });

        return promise;
        // let receivedMessages:string[] = [];
        // this.client.on('output', output => {
        //     receivedMessages.push(output.text);

        //     if(receivedMessages.length == userMessage.botAnswers.length) {
        //         return Promise.resolve(receivedMessages);
        //     }
        // });

        // this.client.sendMessage(userMessage.content);
    }
}