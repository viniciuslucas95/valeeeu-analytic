import { DatabaseConnection } from '../../data-types/types';
import { PcDisk } from '../../entities/models/pc';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IPcDiskMultipleResultsDto,
  IPcDiskRepository,
  IPcDiskSingleResultDto,
  IPcDiskUpdateDto,
} from '../interfaces/pc/pc-disk-repository';

export class PcDiskRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IPcDiskRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'pc_disk');
  }

  async createAsync(data: PcDisk): Promise<void> {
    const { id, disks, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, disks, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    await this.connection.query(query, [
      id,
      JSON.stringify(disks),
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IPcDiskUpdateDto): Promise<void> {
    const { disks, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET disks = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [JSON.stringify(disks), updatedAt, id]);
  }

  async getAsync(id: string): Promise<IPcDiskSingleResultDto | undefined> {
    const query = `SELECT disks, created_at as "createdAt" FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IPcDiskMultipleResultsDto[]> {
    const query = `SELECT id, disks, created_at as "createdAt" FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }
}
