import { EditUserRepository } from '@data/protocols';
import { EditUserDTO } from '@domain/dtos';
import { getCollection } from '../../connection';

export class EditUserMongodbRepository implements EditUserRepository {
	async edit(data: EditUserDTO): Promise<void> {
		const { id, ...rest } = data;

		await getCollection('user').updateOne({ id }, rest);
	}
}
