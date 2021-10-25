import { BaseModel } from '../base-model';

export class PcMemory extends BaseModel {
  readonly total!: number;
  readonly free!: number;
}
