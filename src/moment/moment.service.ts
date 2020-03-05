import {Inject, Injectable, Logger} from '@nestjs/common';
import {IMomentDataAccess} from './moment.da.interface';
import {PagedResponse} from '../response.interface';
import {Moment} from './moment.interface';
import {MomentRequest} from "./moment.request.interface";
import {User} from "../user.interface";

@Injectable()
export class MomentService {

  constructor(@Inject('momentDa') private readonly momentDa: IMomentDataAccess,
              private readonly logger: Logger) {
    this.logger.setContext("MomentService");
  }

  async queryMomentsByPage(page: number, size: number): Promise<PagedResponse<Moment>> {
    const items = await this.momentDa.queryByPage(page, size);
    const totalCount = await this.momentDa.getTotal();
    const totalPages = Math.floor(totalCount / size) + 1;
    this.logger.log(`query moment list`);

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
    this.logger.log(`query moment ${id}`);
    return await this.momentDa.queryById(id);
  }

  async save(momentRequest: MomentRequest, user: User): Promise<Moment> {
    this.logger.log(`create moment ${momentRequest.text}`);

    let moment = {
      ...momentRequest,
      created_at: new Date(),
      reposts_count: 1,
      comments_count: 1,
      attitudes_count: 1,
      user: user,
      pic_num: 1,
    } as Moment;

    return await this.momentDa.save(moment);
  }
}
