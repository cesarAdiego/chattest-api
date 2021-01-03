export class ProjectConfiguration {
    public projectId: number;
    public cognigyConfiguration: CognigyConfiguration;
    public dialogFlowConfiguration: DialogFlowConfiguration; 

    get isCognigyConfiguration(): boolean {
        return this.cognigyConfiguration != undefined;
    }

    get isDialogflowConfiguration(): boolean {
        return this.dialogFlowConfiguration != undefined;
    }
}

export class CognigyConfiguration {
    public projectConfigurationId: number;
    public configUrl: string;
} 

export class DialogFlowConfiguration {
    public projectConfigurationId: number;
    public projectId: string;
}