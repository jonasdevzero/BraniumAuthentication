import { RecoverPassword } from '@domain/use-cases/RecoverPassword';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { RecoverPasswordValidator } from '@presentation/validators';

@controller()
@middlewares(RecoverPasswordValidator)
@route.post('/password/recover')
export class RecoverPasswordController implements Controller {
	constructor(
		@inject.usecase('RecoverPassword')
		private readonly recoverPassword: RecoverPassword,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		await this.recoverPassword.recover(data);

		return response.noContent();
	}
}
