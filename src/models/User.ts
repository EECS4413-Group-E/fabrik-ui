export const UserRole = {
    Admin: "ADMIN",
    User: "USER"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    email: string;
    role: UserRole;
}

export interface LoginRegisterRequest {
    email: string;
    password: string;
}