export enum ApplicationStages {
    Development = "dev",
    Production = "prod",
    Testing = "test",
    Staging = "staging"
}

export interface Application {
    stage: string
    version: string // use SemVer
    service: string
}