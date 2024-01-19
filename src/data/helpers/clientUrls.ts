import { ENV } from '@main/config/env';

export const clientUrls = {
	welcome: (token: string, email: string) =>
		String(ENV.VALIDATE_EMAIL_URL).replace(':token', token).replace(':email', email),

	resetPassword: (token: string) =>
		String(ENV.RESET_PASSWORD_URL).replace(':token', token),
};
