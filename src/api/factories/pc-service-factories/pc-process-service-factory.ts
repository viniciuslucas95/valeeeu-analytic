import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { PcProcessRepositoryPostgresql } from '../../repositories/pc';
import { PcProcessService } from '../../services/pc';

export class PcProcessServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new PcProcessRepositoryPostgresql(connection);
    return new PcProcessService(repository);
  }
}
