import { generateAuthentication } from '@data/helpers';
import { Encrypter, FindUserByUsernameRepository, HashComparer } from '@data/protocols';
import { LoginUserDTO } from '@domain/dtos';
import { Authentication } from '@domain/models';
import { LoginUser } from '@domain/use-cases/LoginUser';
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

		const authentication = generateAuthentication(this.encrypter, {
			userId: user.id,
			role: user.role,
		});

		return authentication;
	}
}
