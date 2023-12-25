import { CreateMetadataRepository } from '@data/protocols/db/metadata/CreateMetadataRepository';
import { CreateMetadataDTO } from '@domain/dtos';
import { Metadata } from '@domain/models';
import { randomUUID } from 'crypto';
import { getCollection } from '../../connection';

export class CreateMetadataMongodbRepository implements CreateMetadataRepository {
	async create(data: CreateMetadataDTO): Promise<Metadata> {
		const metadata: Metadata = {
			id: randomUUID(),
			...data,
			createdAt: new Date(),
		};

		await getCollection('metadata').insertOne(metadata);

		return metadata;
	}
}
