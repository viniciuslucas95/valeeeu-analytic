import { DatabaseConnection } from '../../data-types/types';
import { IPcMemoryDto } from '../../entities/dtos/pc';
import { PcMemory } from '../../entities/models/pc';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IPcMemoryMultipleResultsDto,
  IPcMemoryRepository,
  IPcMemorySingleResultDto,
  IPcMemoryUpdateDto,
} from '../interfaces/pc/pc-memory-repository';

export class PcMemoryRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IPcMemoryRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'pc_memory');
  }

  async createAsync(data: PcMemory): Promise<void> {
    const { id, free, total, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, total, free, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [id, total, free, createdAt, updatedAt]);
  }

  async updateAsync(id: string, data: IPcMemoryUpdateDto): Promise<void> {
    const { free, total, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET total = $1, free = $2, updated_at = $3 WHERE id = $4;`;
    await this.connection.query(query, [total, free, updatedAt, id]);
  }

  async getAsync(id: string): Promise<IPcMemorySingleResultDto | undefined> {
    const query = `SELECT total, free, created_at FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    const result = rows[0];
    return result
      ? {
          total: result.total,
          free: result.free,
          createdAt: result.created_at,
        }
      : undefined;
  }

  async getAllAsync(): Promise<IPcMemoryMultipleResultsDto[]> {
    const query = `SELECT id, total, free, created_at FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows.map((row) => {
      return {
        id: row.id,
        total: row.total,
        free: row.free,
        createdAt: row.created_at,
      };
    });
  }
}
