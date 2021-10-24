import { Router } from 'express';
import { PcStatisticController } from '../controllers';

export class PcStatisticRouter {
  static create() {
    const router = Router();
    router.get('/statistics/pc', PcStatisticController.test);
    return router;
  }
}
