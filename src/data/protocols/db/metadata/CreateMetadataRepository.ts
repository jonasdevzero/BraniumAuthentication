import { CreateMetadataDTO } from '@domain/dtos';
import { Metadata } from '@domain/models';

export interface CreateMetadataRepository {
	create(data: CreateMetadataDTO): Promise<Metadata>;
}
