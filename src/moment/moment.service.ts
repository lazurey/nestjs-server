import { Inject, Injectable } from '@nestjs/common';
import { IMomentDataAccess } from './moment.da.interface';
import { PagedResponse } from '../response.interface';
import { Moment } from './moment.interface';

@Injectable()
export class MomentService {

  constructor(@Inject('momentDa') private readonly momentDa: IMomentDataAccess) {
  }

  async queryMomentsByPage(page: number, size: number): Promise<PagedResponse<Moment>> {
    const items = await this.momentDa.queryByPage(page, size);
    const totalCount = await this.momentDa.getTotal();
    const totalPages = Math.floor(totalCount / size) + 1;
    return {
      items,
      currentPage: page,
      pageSize: size,
      totalPages,
      totalCount,
      isLast: page >= totalPages,
    }
  }

  async queryById(id: string) {
    return await this.momentDa.queryById(id);
  }
}
