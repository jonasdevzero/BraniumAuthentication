import { RegisterUser } from '@domain/use-cases/RegisterUser';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { RegisterUserValidator } from '@presentation/validators';

@controller()
@middlewares(RegisterUserValidator)
@route.post('register')
export class RegisterUserController implements Controller {
	constructor(
		@inject.usecase('RegisterUser')
		private readonly registerUser: RegisterUser,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		await this.registerUser.register(data);

		return response.created();
	}
}
