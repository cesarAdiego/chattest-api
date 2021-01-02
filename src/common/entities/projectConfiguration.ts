export class ProjectConfiguration {
    public projectId: number;
    public cognigyConfiguration: CognigyConfiguration;
    public dialogFlowConfiguration: DialogFlowConfiguration; 
}

export class CognigyConfiguration {
    public projectConfigurationId: number;
    public configUrl: string;
} 

export class DialogFlowConfiguration {
    public projectConfigurationId: number;
    public projectId: string;
}