import { User } from '../user.interface';

export interface Moment {
  createdAt: Date;
  content: string;
  createdBy: User;
}
