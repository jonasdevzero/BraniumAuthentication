import { Encrypter } from '@data/protocols';
import { Authentication, UserRole } from '@domain/models';
import { ENV } from '@main/config/env';

interface AuthenticationData {
	userId: string;
	role: UserRole;
}

export function generateAuthentication(encrypter: Encrypter, data: AuthenticationData) {
	const { userId, role } = data;

	const access = encrypter.encrypt(userId, { payload: { role } });
	const refresh = encrypter.encrypt(userId, {
		payload: { role },
		expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
	});

	return { access, refresh } as Authentication;
}
