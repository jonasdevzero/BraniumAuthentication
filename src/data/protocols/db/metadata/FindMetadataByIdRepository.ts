import { Metadata } from '@domain/models';

export interface FindMetadataByIdRepository {
	find(id: string): Promise<Metadata | null>;
}
