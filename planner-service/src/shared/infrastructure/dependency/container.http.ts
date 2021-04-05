import { DependencyContainer } from "tsyringe";
import { HttpMux } from "../transport/http/http.mux";
import { HttpServer } from "../transport/http/http.server";

export function startHttpContainer(kernelContainer: DependencyContainer) {
    kernelContainer.register(HttpMux, { useClass: HttpMux });
    kernelContainer.register(HttpServer, { useClass: HttpServer });
}