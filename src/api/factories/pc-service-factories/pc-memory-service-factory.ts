import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { PcMemoryRepositoryPostgresql } from '../../repositories/pc';
import { PcMemoryService } from '../../services/pc';

export class PcMemoryServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new PcMemoryRepositoryPostgresql(connection);
    return new PcMemoryService(repository);
  }
}
