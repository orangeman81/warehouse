import { Assignee } from './assignee';
import { Product } from 'src/app/models/product';
import { Incoming } from './incoming';
export interface paginatedData {
    data: Product[] | Assignee[] | Incoming[];
    total: number;
}