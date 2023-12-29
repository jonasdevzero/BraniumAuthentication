import { FindUserByUsernameRepository } from '@data/protocols';
import { User } from '@domain/models';
import { getCollection } from '../../connection';

export class FindUserByUsernameMongodbRepository implements FindUserByUsernameRepository {
	async find(username: string): Promise<User | null> {
		const user = await getCollection('user').findOne<User>({ username });

		if (!user) return null;

		Object.assign(user, { _id: undefined });
		return user;
	}
}
