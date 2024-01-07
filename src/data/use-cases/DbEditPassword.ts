import { EditUserRepository, FindUserByIdRepository } from '@data/protocols';
import { EditPasswordDTO } from '@domain/dtos';
import { EditPassword } from '@domain/use-cases/EditPassword';
import { HashComparer, Hasher } from '@infra/authentication';
import { inject, injectable } from '@main/container';
import { BadRequestError, NotAuthorizedError } from '@presentation/errors';

@injectable()
export class DbEditPassword implements EditPassword {
	constructor(
		@inject('FindUserByIdRepository')
		private readonly findUserByIdRepository: FindUserByIdRepository,

		@inject('HashComparer')
		private readonly hashComparer: HashComparer,

		@inject('Hasher')
		private readonly hasher: Hasher,

		@inject('EditUserRepository')
		private readonly editUserRepository: EditUserRepository,
	) {}

	async edit(data: EditPasswordDTO): Promise<void> {
		const { userId, oldPassword, newPassword } = data;

		const user = await this.findUserByIdRepository.find(userId);

		if (!user) {
			throw new NotAuthorizedError('user');
		}

		const isValidPassword = await this.hashComparer.compare(oldPassword, user.password);

		if (!isValidPassword) {
			throw new BadRequestError('Invalid password');
		}

		const hashedPassword = await this.hasher.hash(newPassword);

		await this.editUserRepository.edit({ id: userId, password: hashedPassword });
	}
}
