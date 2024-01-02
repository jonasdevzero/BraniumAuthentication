export interface RemoveCache {
	remove(key: string): Promise<void>;
}
