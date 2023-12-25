import { validator } from '@presentation/decorators/validator';
import { passwordSchema, usernameSchema } from '@presentation/helpers/validators';
import { HttpRequest, Middleware } from '@presentation/protocols';
import { z } from 'zod';

@validator
export class RegisterUserValidator implements Middleware {
	private readonly schema = z.object({
		body: z
			.object({
				username: usernameSchema,
				email: z.string().email(),
				password: passwordSchema,
			})
			.strict(),
	});

	async handle(httpRequest: HttpRequest): Promise<void> {
		const parsed = await this.schema.parseAsync(httpRequest);
		Object.assign(httpRequest, parsed);
	}
}
