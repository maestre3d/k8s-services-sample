import { Express } from 'express';

export interface HttpController {
    mapRoutes(router: Express): void
}