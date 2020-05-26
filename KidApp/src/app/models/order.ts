import { Division, File , Author} from './';

export class Order {
  id: number;
  authorId: number;
  author: Author;
  divisionId: number;
  toUserId: number;
  toUser: Author;
  startDate: Date | string;
  endDate: Date | string;
  shortText: string;
  orderText: string;
  rejectText: string;
  answer: string;
  files: File[];
  statusId: number;
  status: any;
  closeDate: Date | null | string;
}
