import express from 'express';
import { EnvironmentConfig, PcStatisticConfig } from '../configs';
import {
  PcCpuServiceFactory,
  PcDiskServiceFactory,
  PcMemoryServiceFactory,
  PcProcessServiceFactory,
} from './factories/pc-service-factories';
import { PcStatisticHandler } from './helpers';
import { RouteHandler } from './routes';

const server = express();
server.use(express.json({ limit: '5mb' }));
RouteHandler.setup(server);
server.listen(EnvironmentConfig.serverPort, () => {
  console.log('Server started...');
});

// Start recording pc statistics
const cpuService = PcCpuServiceFactory.create();
const memoryService = PcMemoryServiceFactory.create();
const processService = PcProcessServiceFactory.create();
const diskService = PcDiskServiceFactory.create();

async function recordStatisticsAsync() {
  try {
    const { cpu, disks, memory, processes } =
      await PcStatisticHandler.getPcStatisticsAsync();
    await cpuService.createAsync(cpu);
    await memoryService.createAsync(memory);
    await processService.createAsync(processes);
    await diskService.createAsync(disks);
    setTimeout(() => recordStatisticsAsync(), PcStatisticConfig.checkInterval);
  } catch (err) {
    console.error(err);
  }
}

recordStatisticsAsync();
