import { IMomentDataAccess } from './moment.da.interface';
import { Moment } from './moment.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MomentMemoryRepository implements IMomentDataAccess {
  private readonly moments: Moment[];

  constructor() {
    this.moments = [{
      content: 'Hello World',
      createdAt: new Date('1970-01-01 00:00:01'),
      createdBy: {
        username: 'robo_head',
      },
    }];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(page: number, size: number): Promise<Moment[]> {
    return new Promise((resolve) => resolve(this.moments));
  }

  getTotal(): Promise<number> {
    return Promise.resolve(120);
  }

}
