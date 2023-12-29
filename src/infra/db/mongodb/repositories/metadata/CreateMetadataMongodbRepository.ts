import { CreateMetadataRepository } from '@data/protocols/db/metadata/CreateMetadataRepository';
import { CreateMetadataDTO } from '@domain/dtos';
import { Metadata } from '@domain/models';
import { getCollection } from '../../connection';

export class CreateMetadataMongodbRepository implements CreateMetadataRepository {
	async create(data: CreateMetadataDTO): Promise<Metadata> {
		const metadata: Omit<Metadata, 'id'> = {
			...data,
			createdAt: new Date(),
		};

		const { insertedId } = await getCollection('metadata').insertOne(metadata);

		return { id: insertedId.toString('hex'), ...metadata };
	}
}
