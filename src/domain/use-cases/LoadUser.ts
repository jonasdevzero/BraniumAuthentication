import { LoadedUser } from '@domain/models';

export interface LoadUser {
	load(userId: string): Promise<LoadedUser>;
}
