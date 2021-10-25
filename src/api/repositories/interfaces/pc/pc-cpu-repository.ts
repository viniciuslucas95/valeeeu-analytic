import { IPcCpuDto } from '../../../entities/dtos/pc';
import { PcCpu } from '../../../entities/models/pc';
import { IReadRepository, IWriteRepository } from '../base-repository';

export interface IPcCpuUpdateDto extends IPcCpuDto {
  updatedAt: Date;
}

export interface IPcCpuSingleResultDto extends IPcCpuDto {
  createdAt: Date;
}

export interface IPcCpuMultipleResultsDto extends IPcCpuSingleResultDto {
  id: string;
}

export interface IPcCpuRepository
  extends IWritePcCpuRepository,
    IReadPcCpuRepository {}

export interface IWritePcCpuRepository
  extends IWriteRepository<PcCpu, IPcCpuUpdateDto> {}

export interface IReadPcCpuRepository
  extends IReadRepository<IPcCpuSingleResultDto, IPcCpuMultipleResultsDto> {}
