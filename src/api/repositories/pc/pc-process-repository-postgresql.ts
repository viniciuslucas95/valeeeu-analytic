import { DatabaseConnection } from '../../data-types/types';
import { PcProcess } from '../../entities/models/pc';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IPcProcessMultipleResultsDto,
  IPcProcessRepository,
  IPcProcessSingleResultDto,
  IPcProcessUpdateDto,
} from '../interfaces/pc/pc-process-repository';

export class PcProcessRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IPcProcessRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'pc_process');
  }

  async createAsync(data: PcProcess): Promise<void> {
    const { id, processes, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, processes, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    await this.connection.query(query, [
      id,
      JSON.stringify(processes),
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IPcProcessUpdateDto): Promise<void> {
    const { processes, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET processes = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [
      JSON.stringify(processes),
      updatedAt,
      id,
    ]);
  }

  async getAsync(id: string): Promise<IPcProcessSingleResultDto | undefined> {
    const query = `SELECT processes, created_at as "createdAt" FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IPcProcessMultipleResultsDto[]> {
    const query = `SELECT id, processes, created_at as "createdAt" FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }
}
