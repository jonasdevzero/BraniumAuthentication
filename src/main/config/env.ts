import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).default('development'),

	PORT: z.string().default('5001').transform(Number),

	PRIVATE_KEY: z.string().default('certificates/server-key.pem'),
	CERTIFICATE: z.string().default('certificates/server-cert.pem'),
	CA: z.string().default('certificates/ca-cert.pem'),

	DATABASE_URL: z.string(),

	CACHE_DRIVER: z.enum(['fake', 'ioredis']),
	REDIS_URL: z.string(),

	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string().default('1hour'),
	JWT_REFRESH_EXPIRES_IN: z.string().default('3days'),

	MAIL_DRIVER: z.enum(['fake', 'sendgrid']).default('fake'),
	MAIL_EMAIL_FROM: z.string().optional(),
	MAIL_USER_FROM: z.string().optional(),

	MAIL_SENDGRID_API_KEY: z.string().optional(),

	VALIDATE_EMAIL_URL: z.string(),
	RESET_PASSWORD_URL: z.string(),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
	const result = envSchema.safeParse(process.env);
	if (!result.success) return result.error.issues;
};
