import { HttpController } from "./http.controller";

import { Express } from 'express';
import { container, injectable } from 'tsyringe';


@injectable()
export class HttpMux {
    private controllers: Array<HttpController>;

    constructor() {
        this.controllers = container.resolveAll<HttpController>('HttpController');
    }

    start(router: Express): void {
        this.controllers.forEach((controller) => {
            controller.mapRoutes(router);
        });
    }
}