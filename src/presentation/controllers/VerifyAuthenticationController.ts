import { controller, middlewares, route } from '@presentation/decorators';
import { response } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

@controller()
@middlewares('EnsureAuthenticated')
@route.get('/auth/verify')
export class VerifyAuthenticationController implements Controller {
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		return response.ok(httpRequest.user.id);
	}
}
