export interface User {
	id: string;

	username: string;
	email: string;
	password: string;
	verified: boolean;

	createdAt: Date;
	updatedAt: Date;
}
