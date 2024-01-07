import {
	CreateMetadataRepository,
	FindUserByUsernameRepository,
	MailProvider,
} from '@data/protocols';
import { RecoverPasswordDTO } from '@domain/dtos';
import { RecoverPassword } from '@domain/use-cases/RecoverPassword';
import { HashComparer } from '@infra/authentication';
import { inject, injectable } from '@main/container';
import { BadRequestError } from '@presentation/errors';

@injectable()
export class DbRecoverPassword implements RecoverPassword {
	constructor(
		@inject('FindUserByUsernameRepository')
		private readonly findUserByUsernameRepository: FindUserByUsernameRepository,

		@inject('HashComparer')
		private readonly hashComparer: HashComparer,

		@inject('CreateMetadataRepository')
		private readonly createMetadataRepository: CreateMetadataRepository,

		@inject('MailProvider')
		private readonly mailProvider: MailProvider,
	) {}

	async recover(data: RecoverPasswordDTO): Promise<void> {
		const { username, email } = data;

		const user = await this.findUserByUsernameRepository.find(username);

		if (!user) {
			throw new BadRequestError('username or email invalid');
		}

		const isValidEmail = await this.hashComparer.compare(email, user.email);

		if (!isValidEmail) {
			throw new BadRequestError('username or email invalid');
		}

		const metadata = await this.createMetadataRepository.create({
			userId: user.id,
			name: 'reset-password',
			value: '',
		});

		this.mailProvider.send({
			subject: 'Recuperação de senha',
			body: `http://localhost:3000/recover-password?token=${metadata.id}`,
			to: { email },
		});
	}
}
