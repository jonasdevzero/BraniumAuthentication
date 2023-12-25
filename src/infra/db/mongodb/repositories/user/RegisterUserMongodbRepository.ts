import { RegisterUserRepository } from '@data/protocols';
import { RegisterUserDTO } from '@domain/dtos';
import { User } from '@domain/models';
import { getCollection } from '../../connection';
import { randomUUID } from 'crypto';

export class RegisterUserMongodbRepository implements RegisterUserRepository {
	async create(data: RegisterUserDTO): Promise<User> {
		const date = new Date();

		const user: User = {
			id: randomUUID(),
			...data,
			verified: false,
			createdAt: date,
			updatedAt: date,
		};

		await getCollection('user').insertOne(user);

		return user;
	}
}
