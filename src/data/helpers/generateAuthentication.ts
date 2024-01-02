import { Encrypter } from '@data/protocols';
import { Authentication } from '@domain/models';
import { ENV } from '@main/config/env';

interface AuthenticationData {
	sessionId: string;
}

export function generateAuthentication(
	encrypter: Encrypter,
	sessionId: string,
): Authentication {
	const access = encrypter.encrypt(sessionId);
	const refresh = encrypter.encrypt(sessionId, {
		expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
	});

	return { access, refresh };
}
