import { Moment } from './moment.interface';

export interface IMomentDataAccess {
  findAll(page: number, size: number): Promise<Moment[]>;
  getTotal(): Promise<number>;
}
