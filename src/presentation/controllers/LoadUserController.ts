import { LoadUser } from '@domain/use-cases/LoadUser';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@middlewares('EnsureAuthenticated')
@route.get('/auth')
export class LoadUserController implements Controller {
	constructor(
		@inject.usecase('LoadUser')
		private readonly loadUser: LoadUser,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.user;

		const result = await this.loadUser.load(id);

		return response.ok(result);
	}
}
