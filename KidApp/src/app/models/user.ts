import { UserRole, Division } from './';

export class User {
    id: number;
    login: string;
    userName: string;
    passwordHash: string;
    roleId: number;
    divisionId: number;
    division: Division;
}

