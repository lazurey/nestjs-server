import { Controller, Get, Query } from '@nestjs/common';
import { PagedResponse } from '../response.interface';
import { MomentService } from './moment.service';
import { PagedQueryParams } from '../request.interface';
import { Moment } from './moment.interface';

@Controller('moments')
export class MomentController {

  constructor(private readonly momentService: MomentService) {
  }

  @Get()
  async getMoments(@Query() query: PagedQueryParams): Promise<PagedResponse<Moment>> {
    const pagedResults = await this.momentService.queryMomentsByPage(query.page || 0, query.size || 20);
    console.log(query);
    return pagedResults;
  }
}
