import { FindUserByUsernameRepository } from '@data/protocols';
import { User } from '@domain/models';
import { getCollection } from '../../connection';

export class FindUserByUsernameMongodbRepository implements FindUserByUsernameRepository {
	async find(username: string): Promise<User | null> {
		const user = await getCollection('user').findOne<User>({ username });
		return user;
	}
}
