import { Assignee } from './assignee';
import { Product } from 'src/app/models/product';
export interface paginatedData {
    data: Product[] | Assignee[];
    total: number;
}