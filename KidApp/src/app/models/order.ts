import { Division, File , Author} from './';

export class Order {
  id: number;
  authorId: number;
  author: Author;
  divisionId: number;
  toUserId: number;
  toUser: Author;
  startDate: Date;
  endDate: Date;
  shortText: string;
  orderText: string;
  answer: string;
  files: File[];
  status: number;
  closeDate: Date | null;
}
