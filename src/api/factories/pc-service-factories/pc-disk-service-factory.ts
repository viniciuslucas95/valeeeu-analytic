import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { PcDiskRepositoryPostgresql } from '../../repositories/pc';
import { PcDiskService } from '../../services/pc';

export class PcDiskServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new PcDiskRepositoryPostgresql(connection);
    return new PcDiskService(repository);
  }
}
