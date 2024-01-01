import {
	DeleteMetadataRepository,
	EditUserRepository,
	FindMetadataByIdRepository,
	FindUserByIdRepository,
	HashComparer,
} from '@data/protocols';
import { ValidateEmailDTO } from '@domain/dtos';
import { LoadedUser } from '@domain/models';
import { ValidateEmail } from '@domain/use-cases/ValidateEmail';
import { inject, injectable } from '@main/container';
import { BadRequestError, UnauthorizedError } from '@presentation/errors';

@injectable()
export class DbValidateEmail implements ValidateEmail {
	constructor(
		@inject('FindMetadataByIdRepository')
		private readonly findMetadataByIdRepository: FindMetadataByIdRepository,

		@inject('FindUserByIdRepository')
		private readonly findUserByIdRepository: FindUserByIdRepository,

		@inject('DeleteMetadataRepository')
		private readonly deleteMetadataRepository: DeleteMetadataRepository,

		@inject('HashComparer')
		private readonly hashComparer: HashComparer,

		@inject('EditUserRepository')
		private readonly editUserRepository: EditUserRepository,
	) {}

	async validate(data: ValidateEmailDTO): Promise<LoadedUser> {
		const { token, email } = data;

		const metadata = await this.findMetadataByIdRepository.find(token);

		if (!metadata || metadata.name !== 'verify-email') {
			throw new UnauthorizedError('Invalid token');
		}

		const expiredDate = metadata.createdAt;
		expiredDate.setMinutes(expiredDate.getMinutes() + 10);

		const isExpired = Date.now() > expiredDate.getTime();

		if (isExpired) {
			await this.deleteMetadataRepository.delete(metadata.id);
			throw new UnauthorizedError('Expired token');
		}

		const user = await this.findUserByIdRepository.find(metadata.userId);

		if (!user) {
			await this.deleteMetadataRepository.delete(metadata.id);
			throw new UnauthorizedError('Invalid token');
		}

		if (user.verified) {
			await this.deleteMetadataRepository.delete(metadata.id);
			throw new BadRequestError('User already verified');
		}

		const isValidEmail = await this.hashComparer.compare(email, user.email);

		if (!isValidEmail) {
			throw new UnauthorizedError('Invalid token');
		}

		await this.editUserRepository.edit({ id: user.id, verified: true });
		await this.deleteMetadataRepository.delete(metadata.id);

		return { id: user.id, username: user.username, role: user.role };
	}
}
