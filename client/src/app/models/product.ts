import { Incoming } from './incoming';
export interface Product extends Incoming {
    _id: string;
    name: string;
    producer?: string;
    type: string;
    conditions?: string;
    deleted?: boolean;
    assigneeId?: string;
    assignmentDate?: number;
}
