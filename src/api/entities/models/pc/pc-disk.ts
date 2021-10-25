import { IPcDiskDto } from '../../dtos/pc';
import { BaseModel } from '../base-model';

export class PcDisk extends BaseModel {
  disks!: IPcDiskDto[];
}
