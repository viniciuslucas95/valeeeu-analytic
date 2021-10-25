import { IPcProcessDto } from '../../dtos/pc';
import { BaseModel } from '../base-model';

export class PcProcess extends BaseModel {
  processes!: IPcProcessDto[];
}
