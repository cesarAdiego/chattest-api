import { BotAnswerExecutionResult } from "../entities/botAnswerExecutionResult";
import { MessageModel } from "./messageModel";

export class BotAnswerExecutionResultModel {
    public expectedBotAnswer: MessageModel;
    public botAnswer: string;
    public areEqual: boolean;

    constructor(executionResult: BotAnswerExecutionResult) {
        this.expectedBotAnswer = new MessageModel(executionResult.expectedBotAnswer);
        this.botAnswer = executionResult.botAnswer;
        this.areEqual = executionResult.areEqual;
    }
}