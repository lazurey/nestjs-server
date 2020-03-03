import { IMomentDataAccess } from './moment.da.interface';
import { Moment } from './moment.interface';
import { Injectable } from '@nestjs/common';
import { chain, slice } from 'lodash';

@Injectable()
export class MomentMemoryRepository implements IMomentDataAccess {
  private readonly moments: Moment[];

  constructor() {
    this.moments = this.generateMoments(120);
  }

  findAll(page: number, size: number): Promise<Moment[]> {
    return new Promise((resolve) => resolve(slice(this.moments, page * size, (page + 1) * size)));
  }

  getTotal(): Promise<number> {
    return Promise.resolve(this.moments.length);
  }

  generateMoments(count: number): Moment[] {
    const arr = new Array(count);
    return chain(arr)
      .fill(0)
      .map((_, idx: number): Moment => ({
        content: `Hello World: ${idx === 0 ? 'once' : (idx + 1) + ' times.'}`,
        createdAt: new Date('1970-01-01 00:00:00'),
        createdBy: {
          username: 'robo_head',
        },
      }))
      .value();
  }
}
