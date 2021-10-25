import { ValidationError } from '../errors';

export class PercentageValidator {
  static validate(percentage: number) {
    if (percentage < 0 || percentage > 100)
      throw new ValidationError('InvalidPercentageRange(0-100)');
  }
}
