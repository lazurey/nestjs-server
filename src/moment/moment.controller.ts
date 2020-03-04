import {Controller, Get, NotFoundException, Param, Query, UseGuards} from '@nestjs/common';
import { PagedResponse } from '../response.interface';
import { MomentService } from './moment.service';
import { PagedQueryParams } from '../request.interface';
import { Moment } from './moment.interface';
import { AuthGuard } from '@nestjs/passport';


@Controller('moments')
export class MomentController {

  constructor(private readonly momentService: MomentService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMoments(@Query() query: PagedQueryParams): Promise<PagedResponse<Moment>> {
    return await this.momentService.queryMomentsByPage(query.page || 0, query.size || 20);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getMomentById(@Param('id') id: string): Promise<Moment> {
    const result = await this.momentService.queryById(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`Moment with id: ${id} not found.`);
    }
  }
}
