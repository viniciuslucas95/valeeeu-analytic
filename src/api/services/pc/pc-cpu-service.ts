import { IPcCpuDto } from '../../entities/dtos/pc';
import { InvalidRequestError } from '../../errors';
import { IPcCpuRepository } from '../../repositories/interfaces/pc/pc-cpu-repository';
import { PercentageValidator } from '../../validators';
import { BaseService } from '../base-service';

export class PcCpuService extends BaseService {
  constructor(private readonly repository: IPcCpuRepository) {
    super(repository, new InvalidRequestError('PcCpuNotFound'));
  }

  async createAsync(data: IPcCpuDto) {
    const { usagePercentage } = data;
    this.validateUsagePercentage(usagePercentage);
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      usagePercentage,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  private validateUsagePercentage(value: number) {
    PercentageValidator.validate(value);
  }
}
