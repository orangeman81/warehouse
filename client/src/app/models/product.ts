export interface Product {
    _id: string;
    assigneeId: string;
    name: string;
    producer: string;
    serial: string;
    type: string;
    note?: string;
    conditions?: string;
    assignmentDate?: number;
    deleted?: boolean;
    checkInId?: string;
    arrivalDate?: number;
}
