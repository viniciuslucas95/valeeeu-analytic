import { Express } from 'express';
import { ErrorMiddleware } from '../middlewares';
import { PcStatisticRouter } from './pc-statistic-router';

export class RouteHandler {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', PcStatisticRouter.create(), handleError);
  }
}
