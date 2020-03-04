import { User } from '../user.interface';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class MomentRequest {
  @IsNotEmpty()
  text: string;
  pic_infos?: object;
  user: User;
}
