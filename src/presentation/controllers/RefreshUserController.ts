import { RefreshUser } from '@domain/use-cases/RefreshUser';
import { inject } from '@main/container';
import { controller, route } from '@presentation/decorators';
import { UnauthorizedError } from '@presentation/errors';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@route.post('/refresh')
export class RefreshTokenController implements Controller {
	constructor(
		@inject.usecase('RefreshUser')
		private readonly refreshUser: RefreshUser,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { authorization } = httpRequest.headers;

		if (!authorization) {
			throw new UnauthorizedError('Invalid token');
		}

		const [protocol, token] = authorization.split(' ');

		if (protocol !== 'Bearer') {
			throw new UnauthorizedError('Invalid token');
		}

		const result = await this.refreshUser.refresh(token);

		return response.ok(result);
	}
}
