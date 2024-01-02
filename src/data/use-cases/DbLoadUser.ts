import { FindUserByIdRepository, GetCache, StoreCache } from '@data/protocols';
import { LoadedUser } from '@domain/models';
import { LoadUser } from '@domain/use-cases/LoadUser';
import { inject, injectable } from '@main/container';
import { NotFoundError } from '@presentation/errors';

@injectable()
export class DbLoadUser implements LoadUser {
	constructor(
		@inject('FindUserByIdRepository')
		private readonly findUserByIdRepository: FindUserByIdRepository,

		@inject('GetCache')
		private readonly getCache: GetCache,

		@inject('StoreCache')
		private readonly storeCache: StoreCache,
	) {}

	async load(userId: string): Promise<LoadedUser> {
		const cachedUser = await this.getCache.get(`user:${userId}`);

		if (cachedUser) {
			return JSON.parse(cachedUser) as LoadedUser;
		}

		const user = await this.findUserByIdRepository.find(userId);

		if (!user) {
			throw new NotFoundError('user');
		}

		const loadedUser: LoadedUser = {
			id: user.id,
			username: user.username,
			role: user.role,
		};

		await this.storeCache.store(`user:${userId}`, JSON.stringify(loadedUser));

		return loadedUser;
	}
}
