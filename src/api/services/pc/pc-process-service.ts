import { IPcProcessDto } from '../../entities/dtos/pc';
import { InvalidRequestError } from '../../errors';
import { IPcProcessRepository } from '../../repositories/interfaces/pc/pc-process-repository';
import {
  CharacterExistenceValidator,
  PercentageValidator,
} from '../../validators';
import { BaseService } from '../base-service';

export class PcProcessService extends BaseService {
  constructor(private readonly repository: IPcProcessRepository) {
    super(repository, new InvalidRequestError('PcProcessNotFound'));
  }

  async createAsync(data: IPcProcessDto[]) {
    data.forEach(({ name, cpuUsagePercentage, memoryUsagePercentage }) => {
      if (!name) return;
      this.validateCharacter(name);
      this.validateUsagePercentage(cpuUsagePercentage);
      this.validateUsagePercentage(memoryUsagePercentage);
    });
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      processes: data,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  private validateUsagePercentage(value: number) {
    PercentageValidator.validate(value);
  }

  private validateCharacter(value: string) {
    CharacterExistenceValidator.validate(value);
  }
}
