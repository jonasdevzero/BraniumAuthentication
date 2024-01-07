import { generateAuthentication, generateSessionId } from '@data/helpers';
import {
	Encrypter,
	FindUserByUsernameRepository,
	HashComparer,
	StoreCache,
} from '@data/protocols';
import { LoginUserDTO } from '@domain/dtos';
import { Authentication } from '@domain/models';
import { LoginUser } from '@domain/use-cases/LoginUser';
import { constants } from '@main/config/constants';
import { inject, injectable } from '@main/container';
import { BadRequestError } from '@presentation/errors';

@injectable()
export class DbLoginUser implements LoginUser {
	constructor(
		@inject('FindUserByUsernameRepository')
		private readonly findUserByUsernameRepository: FindUserByUsernameRepository,

		@inject('HashComparer')
		private readonly hashComparer: HashComparer,

		@inject('Encrypter')
		private readonly encrypter: Encrypter,

		@inject('StoreCache')
		private readonly storeCache: StoreCache,
	) {}

	async login(data: LoginUserDTO): Promise<Authentication> {
		const { username, password } = data;

		const user = await this.findUserByUsernameRepository.find(username);

		if (!user) {
			throw new BadRequestError('Username or email invalid');
		}

		const isValidPassword = await this.hashComparer.compare(password, user.password);

		if (!isValidPassword) {
			throw new BadRequestError('Username or email invalid');
		}

		const sessionId = generateSessionId();

		const authentication = generateAuthentication(this.encrypter, sessionId);

		await this.storeCache.store(`session:${sessionId}`, user.id, {
			expires: constants.SESSION_EXPIRES,
		});

		return authentication;
	}
}
