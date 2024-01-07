import { generateAuthentication, generateSessionId } from '@data/helpers';
import { GetCache, RemoveCache, StoreCache } from '@data/protocols';
import { Authentication } from '@domain/models';
import { RefreshUser } from '@domain/use-cases/RefreshUser';
import { Decrypter, Encrypter } from '@infra/authentication';
import { constants } from '@main/config/constants';
import { inject, injectable } from '@main/container';
import { UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbRefreshUser implements RefreshUser {
	constructor(
		@inject('Decrypter')
		private readonly decrypter: Decrypter,

		@inject('Encrypter')
		private readonly encrypter: Encrypter,

		@inject('GetCache')
		private readonly getCache: GetCache,

		@inject('RemoveCache')
		private readonly removeCache: RemoveCache,

		@inject('StoreCache')
		private readonly storeCache: StoreCache,
	) {}

	async refresh(token: string): Promise<Authentication> {
		let sessionId = '';

		try {
			sessionId = this.decrypter.decrypt(token);
		} catch (error) {}

		if (!sessionId) {
			throw new UnauthorizedError('Invalid token');
		}

		const userId = await this.getCache.get(`session:${sessionId}`);

		if (!userId) {
			throw new UnauthorizedError('Session expired');
		}

		const newSessionId = generateSessionId();

		await Promise.all([
			this.removeCache.remove(`session:${sessionId}`),
			this.storeCache.store(`session:${newSessionId}`, userId, {
				expires: constants.SESSION_EXPIRES,
			}),
		]);

		return generateAuthentication(this.encrypter, newSessionId);
	}
}
