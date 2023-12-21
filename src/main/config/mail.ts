import { ENV } from '@main/config/env';

interface MailConfig {
	driver: 'fake' | 'sendgrid';
	userFrom: string;
	emailFrom: string;
	config: {
		fake: object;
		sendgrid: {
			api_key: string;
		};
	};
}

export const mailConfig: MailConfig = {
	driver: ENV.MAIL_DRIVER,
	userFrom: ENV.MAIL_USER_FROM || '',
	emailFrom: ENV.MAIL_EMAIL_FROM || '',
	config: {
		fake: {},
		sendgrid: {
			api_key: String(ENV.MAIL_SENDGRID_API_KEY),
		},
	},
};
