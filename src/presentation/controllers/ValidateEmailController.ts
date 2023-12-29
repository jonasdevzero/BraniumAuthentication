import { ValidateEmail } from '@domain/use-cases/ValidateEmail';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ValidateEmailValidator } from '@presentation/validators';

@controller()
@middlewares(ValidateEmailValidator)
@route.post('/register/validate-email')
export class ValidateEmailController implements Controller {
	constructor(
		@inject.usecase('ValidateEmail')
		private readonly validateEmail: ValidateEmail,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		await this.validateEmail.validate(data);

		return response.ok();
	}
}
