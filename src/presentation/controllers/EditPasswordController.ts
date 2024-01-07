import { EditPassword } from '@domain/use-cases/EditPassword';
import { inject } from '@main/container';
import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { EditPasswordValidator } from '@presentation/validators';

@controller()
@middlewares('EnsureAuthenticated', EditPasswordValidator)
@route.patch('/password')
export class EditPasswordController implements Controller {
	constructor(
		@inject.usecase('EditPassword')
		private readonly editPassword: EditPassword,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.user;
		const data = httpRequest.body;

		Object.assign(data, { userId: id });

		await this.editPassword.edit(data);

		return response.noContent();
	}
}
