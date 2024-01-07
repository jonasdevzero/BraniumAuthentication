import { ResetPassword } from '@domain/use-cases/ResetPassword';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ResetPasswordValidator } from '@presentation/validators/ResetPasswordValidator';

@controller()
@middlewares(ResetPasswordValidator)
@route.patch('/password/reset')
export class ResetPasswordController implements Controller {
	constructor(
		@inject.usecase('ResetPassword')
		private readonly resetPassword: ResetPassword,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const data = httpRequest.body;

		await this.resetPassword.reset(data);

		return response.noContent();
	}
}
