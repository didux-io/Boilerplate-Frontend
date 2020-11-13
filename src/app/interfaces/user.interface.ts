export interface IUser {
    id: number;
    email: string;
    publicKey?: string;
    username: string;
    userPower: number | string;
    active: boolean;
}