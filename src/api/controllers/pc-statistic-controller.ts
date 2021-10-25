import { NextFunction, Request, Response } from 'express';
import { PcCpuServiceFactory } from '../factories/pc-service-factories';

export class PcStatisticController {
  static async test(req: Request, res: Response, next: NextFunction) {
    try {
      const pcStatisticService = PcCpuServiceFactory.create();
      //const result = await pcStatisticService.getPcStatisticsAsync();
      res.status(200).json({ get: 'developing' });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
}
