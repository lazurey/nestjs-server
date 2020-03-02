import { Inject, Injectable } from '@nestjs/common';
import { IMomentDataAccess } from './moment.da.interface';
import { PagedResponse } from '../response.interface';
import { Moment } from './moment.interface';

@Injectable()
export class MomentService {

  constructor(@Inject('momentDa') private readonly momentDa: IMomentDataAccess) {
  }

  async queryMomentsByPage(page: number, size: number): Promise<PagedResponse<Moment>> {
    const items = await this.momentDa.findAll(page, size);
    const totalCount = await this.momentDa.getTotal();
    return {
      items,
      currentPage: page,
      pageSize: size,
      totalPages: totalCount % size,
      totalCount,
      isLast: page >= totalCount % size,
    }
  }
}
