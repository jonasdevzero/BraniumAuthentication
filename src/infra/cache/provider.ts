import { GetCaceFakeAdapter } from './fake/GetCaceFakeAdapter';
import { RemoveCacheFakeAdapter } from './fake/RemoveCacheFakeAdapter';
import { StoreCacheFakeAdapter } from './fake/StoreCacheFakeAdapter';
import { GetCacheIoRedisAdapter } from './ioredis/GetCacheIoRedisAdapter';
import { RemoveCacheIoRedisAdapter } from './ioredis/RemoveCacheIoRedisAdapter';
import { StoreCacheIoRedisAdapter } from './ioredis/StoreCacheIoRedisAdapter';

export const providers = {
	fake: {
		get: GetCaceFakeAdapter,
		store: StoreCacheFakeAdapter,
		remove: RemoveCacheFakeAdapter,
	},
	ioredis: {
		get: GetCacheIoRedisAdapter,
		store: StoreCacheIoRedisAdapter,
		remove: RemoveCacheIoRedisAdapter,
	},
};
