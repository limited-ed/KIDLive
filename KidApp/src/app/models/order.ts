import { Division, File , Author, OrderFile} from './';

export class Order
{
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
    orderFiles: OrderFile[];
    statusId: number;
    status: any;
    closeDate: Date | string | null;
}
