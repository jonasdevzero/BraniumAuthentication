export interface DeleteMetadataRepository {
	delete(id: string): Promise<void>;
}
