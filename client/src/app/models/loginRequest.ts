import { User } from './user';
export interface LoginRequest {
    message: string;
    user: User;
    token: string;
}