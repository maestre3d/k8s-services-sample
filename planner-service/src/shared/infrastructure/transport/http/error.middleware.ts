import { DomainError, DomainErrors } from "@sharedKernel/domain/error";
import { Logger } from "@sharedKernel/domain/logger";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export function wrapDomainErrorMiddleware(err: DomainError, req: Request, res: Response, next: NextFunction) {
  let code = 500;
  switch (err.name) {
    case DomainErrors.NotFound:
      code = 404;
      break;
    case DomainErrors.AlreadyExists:
      code = 409;
      break;
    case DomainErrors.OutOfRange:
      code = 400;
      break;
    case DomainErrors.InvalidFormat:
      code = 400;
      break;
    case DomainErrors.Custom:
      code = 400;
      break;
  }

  res.status(code).json({
    error: err,
  })
}

export function wrapErrorLog(logger: Logger): ErrorRequestHandler {
  return (err: DomainError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, { stack: err.stack, name: err.name })
    next(err);
  }
}