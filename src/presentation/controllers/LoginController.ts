import { LoginUser } from '@domain/use-cases/LoginUser';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { LoginValidator } from '@presentation/validators';

@controller()
@middlewares(LoginValidator)
@route.post('/login')
export class LoginController implements Controller {
	constructor(
		@inject.usecase('LoginUser')
		private readonly loginUser: LoginUser,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		const result = await this.loginUser.login(data);

		return response.ok(result);
	}
}
