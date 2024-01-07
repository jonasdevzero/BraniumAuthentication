import {
	DeleteMetadataRepository,
	EditUserRepository,
	FindMetadataByIdRepository,
	FindUserByUsernameRepository,
} from '@data/protocols';
import { ResetPasswordDTO } from '@domain/dtos';
import { ResetPassword } from '@domain/use-cases/ResetPassword';
import { Hasher } from '@infra/authentication';
import { inject, injectable } from '@main/container';
import { BadRequestError, UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbResetPassword implements ResetPassword {
	constructor(
		@inject('FindMetadataByIdRepository')
		private readonly findMetadataByIdRepository: FindMetadataByIdRepository,

		@inject('FindUserByUsernameRepository')
		private readonly findUserByUsernameRepository: FindUserByUsernameRepository,

		@inject('DeleteMetadataRepository')
		private readonly deleteMetadataRepository: DeleteMetadataRepository,

		@inject('Hasher')
		private readonly hasher: Hasher,

		@inject('EditUserRepository')
		private readonly editUserRepository: EditUserRepository,
	) {}

	async reset(data: ResetPasswordDTO): Promise<void> {
		const { token, username, password } = data;

		const [metadata, user] = await Promise.all([
			this.findMetadataByIdRepository.find(token),
			this.findUserByUsernameRepository.find(username),
		]);

		if (!metadata || !user) {
			throw new BadRequestError('Invalid username');
		}

		if (metadata.userId !== user.id) {
			throw new BadRequestError('Invalid username');
		}

		const expiredDate = metadata.createdAt;
		expiredDate.setMinutes(expiredDate.getMinutes() + 10);

		const isExpired = Date.now() > expiredDate.getTime();

		if (isExpired) {
			await this.deleteMetadataRepository.delete(metadata.id);
			throw new UnauthorizedError('Expired token');
		}

		const hashedPassword = await this.hasher.hash(password);

		await Promise.all([
			this.editUserRepository.edit({ id: user.id, password: hashedPassword }),
			this.deleteMetadataRepository.delete(metadata.id),
		]);
	}
}
