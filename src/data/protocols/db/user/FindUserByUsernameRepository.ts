import { User } from '@domain/models';

export interface FindUserByUsernameRepository {
	find(username: string): Promise<User | null>;
}
