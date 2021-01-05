import { Message } from "src/schemas/message.schema";
import { BotAnswerExecutionResult } from "./botAnswerExecutionResult"

export class TestExecutionResult {
    public botAnswerExecutions: BotAnswerExecutionResult[];
    public hasTimeoutError: boolean;

    public get hasErrors(): boolean {
        return !this.botAnswerExecutions.every(execution => execution.areEqual);
    }

    constructor(expectedBotAnswers: Message[], botAnswers: string[], timeoutError: boolean = false) {
        this.botAnswerExecutions = [];
        this.hasTimeoutError = timeoutError;

        for(let i=0; i < expectedBotAnswers.length; i++) {
            let execution = new BotAnswerExecutionResult(expectedBotAnswers[i], botAnswers[i]);
            this.botAnswerExecutions.push(execution);
        }
    }
}