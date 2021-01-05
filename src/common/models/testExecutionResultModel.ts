import { TestExecutionResult } from "../entities/testExecutionResult";
import { BotAnswerExecutionResultModel } from "./botAnswerExecutionResult";

export class TestExecutionResultModel {
    public botAnswerExecutions: BotAnswerExecutionResultModel[];
    public hasErrors: boolean;
    public hasTimeoutError: boolean

    constructor(executionResult: TestExecutionResult) {
        this.botAnswerExecutions = executionResult.botAnswerExecutions.map(execution => new BotAnswerExecutionResultModel(execution));
        this.hasErrors = executionResult.hasErrors;
        this.hasTimeoutError = executionResult.hasTimeoutError;
    }
}