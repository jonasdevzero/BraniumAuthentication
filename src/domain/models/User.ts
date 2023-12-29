export interface User {
	id: string;

	username: string;
	email: string;
	password: string;
	role: UserRole;
	verified: boolean;

	createdAt: Date;
	updatedAt: Date;
}

export type UserRole = 'USER' | 'ADMIN';
export interface Authentication {
	access: string;
	refresh: string;
}
