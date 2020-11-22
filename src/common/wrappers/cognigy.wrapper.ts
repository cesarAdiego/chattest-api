import { WebchatClient } from "@cognigy/webchat-client";
import { TestContent } from "src/schemas/testContent.schema";
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
        return true;
    }

    async connect() {
        await this.client.connect();
    }

    async sendMessage(message: string): Promise<void> {
        try {
            this.client.sendMessage(message);
            Promise.resolve();
        } catch(ex) {
            Promise.reject();
        }
    }

    async receiveMessage(expectedMessage: string): Promise<void> {
        this.client.on('output', output => {
            console.log(output.text);
            return output.text == expectedMessage ? Promise.resolve() : Promise.reject();
        });
    }
}