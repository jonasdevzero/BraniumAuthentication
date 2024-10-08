import { clientUrls, loadEmailTemplate } from '@data/helpers';
import {
	CreateMetadataRepository,
	EditUserRepository,
	FindUserByUsernameRepository,
	Hasher,
	MailProvider,
	RegisterUserRepository,
} from '@data/protocols';
import { EditUserDTO, RegisterUserDTO } from '@domain/dtos';
import { User } from '@domain/models';
import { RegisterUser } from '@domain/use-cases/RegisterUser';
import { inject, injectable } from '@main/container';
import { BadRequestError } from '@presentation/errors';

@injectable()
export class DbRegisterUser implements RegisterUser {
	constructor(
		@inject('FindUserByUsernameRepository')
		private readonly findUserByUsernameRepository: FindUserByUsernameRepository,

		@inject('Hasher')
		private readonly hasher: Hasher,

		@inject('RegisterUserRepository')
		private readonly registerUserRepository: RegisterUserRepository,

		@inject('CreateMetadataRepository')
		private readonly createMetadataRepository: CreateMetadataRepository,

		@inject('EditUserRepository')
		private readonly editUserRepository: EditUserRepository,

		@inject('MailProvider')
		private readonly mailProvider: MailProvider,
	) {}

	async register(data: RegisterUserDTO): Promise<void> {
		const { username, email, password } = data;

		const existsUsername = await this.findUserByUsernameRepository.find(username);

		const [hashedPassword, hashedEmail] = await Promise.all([
			this.hasher.hash(password),
			this.hasher.hash(email),
		]);

		const hashedData = { email: hashedEmail, password: hashedPassword };

		const userId = this.isNewUser(existsUsername)
			? await this.createUser({ username, ...hashedData })
			: await this.editUser({ id: existsUsername!.id, ...hashedData });

		const metadata = await this.createMetadataRepository.create({
			userId,
			name: 'verify-email',
			value: '-',
		});

		const link = clientUrls.welcome(metadata.id, email);

		const emailBody = await loadEmailTemplate('WelcomeEmail', { link });

		await this.mailProvider.send({
			subject: 'Bem vindo ao Branium',
			body: emailBody,
			to: { email },
		});
	}

	private isNewUser(user: User | null) {
		if (!user) return true;

		const limit = user.createdAt;
		limit.setMinutes(limit.getMinutes() + 10);

		if (user.verified || Date.now() < limit.getTime()) {
			throw new BadRequestError('Username already in use');
		}

		return false;
	}

	private async createUser(data: RegisterUserDTO) {
		const user = await this.registerUserRepository.create(data);
		return user.id;
	}

	private async editUser(data: EditUserDTO) {
		await this.editUserRepository.edit({ ...data, createdAt: new Date() });
		return data.id;
	}
}
