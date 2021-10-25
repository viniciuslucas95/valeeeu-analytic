import { IPcDiskDto } from '../../../entities/dtos/pc';
import { PcDisk } from '../../../entities/models/pc';
import { IReadRepository, IWriteRepository } from '../base-repository';

export interface IPcDiskUpdateDto {
  disks: IPcDiskDto[];
  updatedAt: Date;
}

export interface IPcDiskSingleResultDto {
  disks: IPcDiskDto[];
  createdAt: Date;
}

export interface IPcDiskMultipleResultsDto extends IPcDiskSingleResultDto {
  id: string;
}

export interface IPcDiskRepository
  extends IWritePcDiskRepository,
    IReadPcDiskRepository {}

export interface IWritePcDiskRepository
  extends IWriteRepository<PcDisk, IPcDiskUpdateDto> {}

export interface IReadPcDiskRepository
  extends IReadRepository<IPcDiskSingleResultDto, IPcDiskMultipleResultsDto> {}
