import { UnauthorizedError } from '@presentation/errors';
import { Decrypter } from '@data/protocols/authentication';
import { inject, injectable } from '@container';
import { HttpRequest, Middleware } from '../protocols';
import { GetCache } from '@data/protocols';

@injectable()
export class EnsureAuthenticated implements Middleware {
	constructor(
		@inject('Decrypter')
		private readonly decrypter: Decrypter,

		@inject('GetCache')
		private readonly getCache: GetCache,
	) {}

	async handle(httpRequest: HttpRequest): Promise<void> {
		const { authorization } = httpRequest.headers;

		if (!authorization) {
			throw new UnauthorizedError('Invalid token');
		}

		const { 1: token } = authorization.split(' ');

		const sessionId = this.decrypter.decrypt(token);

		const userId = await this.getCache.get(`session:${sessionId}`);

		if (!userId) {
			throw new UnauthorizedError('Session expired');
		}

		Object.assign(httpRequest.user, { id: userId });
	}
}
