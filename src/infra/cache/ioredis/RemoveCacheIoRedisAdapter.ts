import { RemoveCache } from '@data/protocols/cache';
import { ioredis } from './connection';

export class RemoveCacheIoRedisAdapter implements RemoveCache {
	async remove(key: string): Promise<void> {
		try {
			await ioredis.del(key);
		} catch (error) {
			// ...
		}
	}
}
