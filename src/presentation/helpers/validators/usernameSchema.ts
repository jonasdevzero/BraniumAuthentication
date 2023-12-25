import { z } from 'zod';

export const usernameSchema = z
	.string()
	.min(4)
	.max(12)
	.transform((value) => value.toLowerCase().trim())
	.refine(
		(value) => /[a-z-0-9-_]/g.test(value) && !value.includes('-'),
		'The username should contain only lowercase letters, numbers and underline',
	);
