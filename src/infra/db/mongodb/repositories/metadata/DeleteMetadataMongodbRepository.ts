import { DeleteMetadataRepository } from '@data/protocols';
import { ObjectId } from 'mongodb';
import { getCollection } from '../../connection';
import { BadRequestError } from '@presentation/errors';

export class DeleteMetadataMongodbRepository implements DeleteMetadataRepository {
	async delete(id: string): Promise<void> {
		let _id: ObjectId;

		try {
			_id = new ObjectId(id);
		} catch (error) {
			throw new BadRequestError('Invalid token format');
		}

		await getCollection('metadata').deleteOne({ _id });
	}
}
