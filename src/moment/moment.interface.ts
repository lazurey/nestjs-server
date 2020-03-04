import { User } from '../user.interface';

export interface Moment {
  created_at: Date;
  id: number;
  text: string;
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
  user: User;
  pic_num: number;
  pic_infos?: object;
}
