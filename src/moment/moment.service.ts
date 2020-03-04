import {Inject, Injectable} from '@nestjs/common';
import {IMomentDataAccess} from './moment.da.interface';
import {PagedResponse} from '../response.interface';
import {Moment} from './moment.interface';
import {MomentRequest} from "./moment.request.interface";
import {count} from "rxjs/operators";
import {User} from "../user.interface";

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

  async save(momentRequest: MomentRequest, user: User): Promise<Moment> {

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
