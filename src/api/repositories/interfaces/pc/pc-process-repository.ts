import { IPcProcessDto } from '../../../entities/dtos/pc';
import { PcProcess } from '../../../entities/models/pc';
import { IReadRepository, IWriteRepository } from '../base-repository';

export interface IPcProcessUpdateDto {
  processes: IPcProcessDto[];
  updatedAt: Date;
}

export interface IPcProcessSingleResultDto {
  processes: IPcProcessDto[];
  createdAt: Date;
}

export interface IPcProcessMultipleResultsDto
  extends IPcProcessSingleResultDto {
  id: string;
}

export interface IPcProcessRepository
  extends IWritePcProcessRepository,
    IReadPcProcessRepository {}

export interface IWritePcProcessRepository
  extends IWriteRepository<PcProcess, IPcProcessUpdateDto> {}

export interface IReadPcProcessRepository
  extends IReadRepository<
    IPcProcessSingleResultDto,
    IPcProcessMultipleResultsDto
  > {}
