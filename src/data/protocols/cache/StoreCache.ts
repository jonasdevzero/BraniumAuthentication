export interface CacheOptions {
	expires: number;
}

export interface StoreCache {
	store(
		key: string,
		data: string | number | Buffer,
		options?: CacheOptions,
	): Promise<void>;
}
