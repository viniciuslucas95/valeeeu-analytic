import { DatabaseConnection } from '../../data-types/types';
import { IPcCpuDto } from '../../entities/dtos/pc';
import { PcCpu } from '../../entities/models/pc';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IPcCpuMultipleResultsDto,
  IPcCpuRepository,
  IPcCpuSingleResultDto,
  IPcCpuUpdateDto,
} from '../interfaces/pc/pc-cpu-repository';

export class PcCpuRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IPcCpuRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'pc_cpu');
  }

  async createAsync(data: PcCpu): Promise<void> {
    const { id, usagePercentage, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, usage_percentage, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    await this.connection.query(query, [
      id,
      usagePercentage,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IPcCpuUpdateDto): Promise<void> {
    const { usagePercentage, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET usage_percentage = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [usagePercentage, updatedAt, id]);
  }

  async getAsync(id: string): Promise<IPcCpuSingleResultDto | undefined> {
    const query = `SELECT usage_percentage, created_at as "createdAt" FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IPcCpuMultipleResultsDto[]> {
    const query = `SELECT id, usage_percentage, created_at as "createdAt" FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }
}
