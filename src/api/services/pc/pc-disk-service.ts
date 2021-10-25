import { IPcDiskDto } from '../../entities/dtos/pc';
import { InvalidRequestError } from '../../errors';
import { IPcDiskRepository } from '../../repositories/interfaces/pc/pc-disk-repository';
import {
  CharacterExistenceValidator,
  PositiveNumberValidator,
} from '../../validators';
import { BaseService } from '../base-service';

export class PcDiskService extends BaseService {
  constructor(private readonly repository: IPcDiskRepository) {
    super(repository, new InvalidRequestError('PcDiskNotFound'));
  }

  async createAsync(data: IPcDiskDto[]) {
    data.forEach(({ filesystem, free, mountedOn, total }) => {
      this.validateCharacter(filesystem);
      this.validateCharacter(mountedOn);
      this.validatePositiveValue(free);
      this.validatePositiveValue(total);
    });
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      disks: data,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  private validatePositiveValue(value: number) {
    PositiveNumberValidator.validate(value);
  }

  private validateCharacter(value: string) {
    CharacterExistenceValidator.validate(value);
  }
}
