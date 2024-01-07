import { validator } from '@presentation/decorators/validator';
import { usernameSchema } from '@presentation/helpers/validators';
import { HttpRequest, Middleware } from '@presentation/protocols';
import { z } from 'zod';

@validator
export class RecoverPasswordValidator implements Middleware {
	private readonly schema = z.object({
		body: z
			.object({
				username: usernameSchema,
				email: z.string().email(),
			})
			.required()
			.strict(),
	});

	async handle(httpRequest: HttpRequest): Promise<void> {
		const parsed = await this.schema.parseAsync(httpRequest);
		Object.assign(httpRequest, parsed);
	}
}
