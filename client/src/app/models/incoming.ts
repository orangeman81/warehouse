export interface Incoming {
    _id: string;
    description: string;
    serial: string;
    sender: string;
    consignee: string;
    user: string;
    checkInDate: number;
    checked: boolean;
}
