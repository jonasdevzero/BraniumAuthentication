import { RemoveCache } from '@data/protocols/cache';
import { fakeCache } from './connection';

export class RemoveCacheFakeAdapter implements RemoveCache {
	async remove(key: string): Promise<void> {
		delete fakeCache[key];
	}
}
