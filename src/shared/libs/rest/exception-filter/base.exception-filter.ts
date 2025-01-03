import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { createErrorObject } from '../../../helpers/common.js';
import { ServiceError } from '../../../types/service-error.enum.js';

@injectable()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register BaseExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[BaseException]: ${error.message}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ServiceError.ServiceError, error.message));
  }
}
