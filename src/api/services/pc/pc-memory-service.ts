import { IPcMemoryDto } from '../../entities/dtos/pc';
import { InvalidRequestError } from '../../errors';
import { IPcMemoryRepository } from '../../repositories/interfaces/pc/pc-memory-repository';
import { PositiveNumberValidator } from '../../validators';
import { BaseService } from '../base-service';

export class PcMemoryService extends BaseService {
  constructor(private readonly repository: IPcMemoryRepository) {
    super(repository, new InvalidRequestError('PcMemoryNotFound'));
  }

  async createAsync(data: IPcMemoryDto) {
    const { free, total } = data;
    this.validatePositiveValue(free);
    this.validatePositiveValue(total);
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      total,
      free,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  private validatePositiveValue(value: number) {
    PositiveNumberValidator.validate(value);
  }
}
