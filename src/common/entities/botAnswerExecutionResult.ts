import { Message } from "src/schemas/message.schema";

export class BotAnswerExecutionResult {
    public expectedBotAnswer: Message;
    public botAnswer: string;

    get areEqual(): boolean {
        return this.expectedBotAnswer.Content == this.botAnswer;
    }

    constructor(expectedBotAnswer: Message, botAnswer: string) {
        this.expectedBotAnswer = expectedBotAnswer;
        this.botAnswer = botAnswer;
    }
}