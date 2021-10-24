import { NextFunction, Request, Response } from 'express';
import { PcStatisticProvider } from '../providers';

export class PcStatisticController {
  static async test(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PcStatisticProvider.service.getPcStatisticsAsync();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
}
