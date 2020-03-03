import { Moment } from './moment.interface';

export interface IMomentDataAccess {
  queryByPage(page: number, size: number): Promise<Moment[]>;
  getTotal(): Promise<number>;
  queryById(id: string): Promise<Moment | undefined>;
}
