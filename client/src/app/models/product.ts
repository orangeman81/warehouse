export interface Product {
    id: string;
    assigneeId: string;
    name: string;
    producer: string;
    serial: string;
    type: string;
    note?: string;
    conditions?: string;
    assignmentDate?: number;
    deleted?: boolean;
}
