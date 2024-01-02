export interface LogoutUser {
	logout(token: string): Promise<void>;
}
