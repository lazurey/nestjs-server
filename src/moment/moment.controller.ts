import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import {PagedResponse} from '../response.interface';
import {MomentService} from './moment.service';
import {PagedQueryParams} from '../request.interface';
import {Moment} from './moment.interface';
import {MomentRequest} from "./moment.request.interface";


@Controller('moments')
export class MomentController {

  constructor(private readonly momentService: MomentService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMoments(@Query() query: PagedQueryParams): Promise<PagedResponse<Moment>> {
    return await this.momentService.queryMomentsByPage(query.page || 0, query.size || 20);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getMomentById(@Param('id') id: string): Promise<Moment> {
    const result = await this.momentService.queryById(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`Moment with id: ${id} not found.`);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMoment(@Body() momentRequest: MomentRequest, @Request() req): Promise<Moment> {
    return this.momentService.save(momentRequest, req.user);
  }
}
