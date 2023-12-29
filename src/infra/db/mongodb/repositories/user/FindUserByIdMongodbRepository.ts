import { FindUserByIdRepository } from '@data/protocols';
import { User } from '@domain/models';
import { getCollection } from '../../connection';

export class FindUserByIdMongodbRepository implements FindUserByIdRepository {
	async find(id: string): Promise<User | null> {
		const user = await getCollection('user').findOne<User>({ id });

		if (!user) return null;

		Object.assign(user, { _id: undefined });
		return user;
	}
}
