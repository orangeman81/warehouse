import { User } from './user';

export interface LoginRequest {
    user: User;
    accessToken: string;
}