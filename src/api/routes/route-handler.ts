import { Express } from 'express';
import { PcStatisticRouter } from './pc-statistic-router';

export class RouteHandler {
  static setup(server: Express) {
    server.use('/', PcStatisticRouter.create());
  }
}
