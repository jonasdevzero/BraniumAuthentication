import { FindMetadataByIdRepository } from '@data/protocols';
import { Metadata } from '@domain/models';
import { getCollection } from '../../connection';
import { Document, ObjectId } from 'mongodb';
import { BadRequestError } from '@presentation/errors';

export class FindMetadataByIdMongodbRepository implements FindMetadataByIdRepository {
	async find(id: string): Promise<Metadata | null> {
		let _id: ObjectId;

		try {
			_id = new ObjectId(id);
		} catch (error) {
			throw new BadRequestError('Invalid token format');
		}

		const metadata = await getCollection('metadata').findOne<Document>({ _id });

		if (!metadata) return null;

		delete metadata._id;
		Object.assign(metadata, { id });

		return metadata as Metadata;
	}
}
