import { User } from '@domain/models';

export interface FindUserByIdRepository {
	find(id: string): Promise<User | null>;
}
