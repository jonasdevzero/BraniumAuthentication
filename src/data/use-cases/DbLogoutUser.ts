import { RemoveCache } from '@data/protocols';
import { LogoutUser } from '@domain/use-cases/LogoutUser';
import { Decrypter } from '@infra/authentication';
import { inject, injectable } from '@main/container';

@injectable()
export class DbLogoutUser implements LogoutUser {
	constructor(
		@inject('Decrypter')
		private readonly decrypter: Decrypter,

		@inject('RemoveCache')
		private readonly removeCache: RemoveCache,
	) {}

	async logout(token: string): Promise<void> {
		let sessionId = '';

		try {
			sessionId = this.decrypter.decrypt(token);
		} catch (error) {
			return;
		}

		await this.removeCache.remove(`session:${sessionId}`);
	}
}
