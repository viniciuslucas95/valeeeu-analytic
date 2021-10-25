import { IPcMemoryDto } from '../../../entities/dtos/pc';
import { PcMemory } from '../../../entities/models/pc';
import { IReadRepository, IWriteRepository } from '../base-repository';

export interface IPcMemoryUpdateDto extends IPcMemoryDto {
  updatedAt: Date;
}

export interface IPcMemorySingleResultDto extends IPcMemoryDto {
  createdAt: Date;
}

export interface IPcMemoryMultipleResultsDto extends IPcMemorySingleResultDto {
  id: string;
}

export interface IPcMemoryRepository
  extends IWritePcMemoryRepository,
    IReadPcMemoryRepository {}

export interface IWritePcMemoryRepository
  extends IWriteRepository<PcMemory, IPcMemoryUpdateDto> {}

export interface IReadPcMemoryRepository
  extends IReadRepository<
    IPcMemorySingleResultDto,
    IPcMemoryMultipleResultsDto
  > {}
