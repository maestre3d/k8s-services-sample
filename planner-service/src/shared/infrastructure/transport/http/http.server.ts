import { Configuration } from '@sharedKernel/infrastructure/configuration';
import { Logger } from '@sharedKernel/domain/logger';
import { wrapDomainErrorMiddleware, wrapErrorLog } from './error.middleware';
import { HttpMux } from './http.mux';

import os from 'os';
import cluster from 'cluster';
import { Express } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HttpServer {
    constructor(@inject('Logger') private logger: Logger, @inject('Configuration') private config: Configuration,
        @inject('HttpRouter') private router: Express, @inject(HttpMux) private mux: HttpMux) {
        this.mux.start(router);
        this.addObservability();
        this.addDefaultResponseHandler();
    }

    listenAndServe(): void {
        this.start();

        const port = this.config.httpServer.port;
        this.router.listen(port, () => {
            return this.logger.info('http server started', { port: port });
        });
    }

    /**
     * Start and parallelize the current server with workers depending on the Host's number of threads
     */
    private start(): void {
        if (cluster.isMaster) {
            const CPU_THREADS = os.cpus().length;
            for (let i = 0; i < CPU_THREADS; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker) => {
                this.logger.warn(`worker died`, { worker_id: worker.id });
                cluster.fork();
            });
        }
    }

    private addObservability(): void {
        this.router.use(wrapErrorLog(this.logger));
        // TODO: Add tracing with OpenCensus or OpenTracing
        // TODO: Add monitoring with prometheus and/or OpenCensus
    }

    private addDefaultResponseHandler(): void {
        this.router.use(wrapDomainErrorMiddleware);
    }
}
