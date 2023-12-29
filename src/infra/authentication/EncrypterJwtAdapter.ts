import { Encrypter, EncrypterOptions } from '@data/protocols/authentication';
import { ENV } from '@main/config/env';
import jwt from 'jsonwebtoken';

export class EncrypterJwtAdapter implements Encrypter {
	encrypt(subject?: string, options: EncrypterOptions = {}): string {
		const payload = options.payload ?? {};

		return jwt.sign(payload, ENV.JWT_SECRET, {
			subject,
			expiresIn: options.expiresIn || ENV.JWT_EXPIRES_IN,
		});
	}
}
