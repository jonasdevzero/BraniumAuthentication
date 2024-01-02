import { LogoutUser } from '@domain/use-cases/LogoutUser';
import { inject } from '@main/container';
import { controller, route } from '@presentation/decorators';
import { UnauthorizedError } from '@presentation/errors';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@route.post('/logout')
export class LogoutUserController implements Controller {
	constructor(
		@inject.usecase('LogoutUser')
		private readonly logoutUser: LogoutUser,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { authorization } = httpRequest.headers;

		if (!authorization) {
			throw new UnauthorizedError('Invalid token');
		}

		const { 1: token } = authorization.split(' ');

		await this.logoutUser.logout(token);

		return response.ok();
	}
}
