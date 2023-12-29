import { validator } from '@presentation/decorators/validator';
import { HttpRequest, Middleware } from '@presentation/protocols';
import { z } from 'zod';

@validator
export class ValidateEmailValidator implements Middleware {
	private readonly schema = z.object({
		body: z
			.object({
				token: z.string(),
				email: z.string().email(),
			})
			.strict(),
	});

	async handle(httpRequest: HttpRequest): Promise<void> {
		const parsed = await this.schema.parseAsync(httpRequest);
		Object.assign(httpRequest, parsed);
	}
}
