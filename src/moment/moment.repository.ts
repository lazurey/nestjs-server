import { IMomentDataAccess } from './moment.da.interface';
import { Moment } from './moment.interface';
import { Injectable } from '@nestjs/common';
import { chain, find, slice } from 'lodash';

@Injectable()
export class MomentMemoryRepository implements IMomentDataAccess {
  private readonly moments: Moment[];

  constructor() {
    this.moments = MomentMemoryRepository.generateMoments(120);
  }

  queryByPage(page: number, size: number): Promise<Moment[]> {
    return new Promise((resolve) => resolve(slice(this.moments, page * size, (page + 1) * size)));
  }

  getTotal(): Promise<number> {
    return Promise.resolve(this.moments.length);
  }

  queryById(id: string): Promise<Moment | undefined> {
    const result = find(this.moments, (moment: Moment) => moment.id === id);
    return Promise.resolve(result);
  }

  static generateMoments(count: number): Moment[] {
    const arr = new Array(count);
    return chain(arr)
      .fill(0)
      .map((_, idx: number): Moment => ({
        id: `m-${idx}`,
        content: `Hello World: ${idx === 0 ? 'once' : (idx + 1) + ' times.'}`,
        createdAt: new Date('1970-01-01 00:00:00'),
        createdBy: {
          username: 'robo_head',
        },
      }))
      .value();
  }
}
