import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { PcCpuRepositoryPostgresql } from '../../repositories/pc';
import { PcCpuService } from '../../services/pc';

export class PcCpuServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new PcCpuRepositoryPostgresql(connection);
    return new PcCpuService(repository);
  }
}
