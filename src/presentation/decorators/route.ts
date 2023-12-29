import { Controller, HttpMethod } from '../protocols';

type Class<T> = { new (...args: any[]): T };

export interface RouteOptions {
	method: HttpMethod;
	path: string;
}

export const kControllerRoute = Symbol('controller.route');

export function route(method: HttpMethod, path: string) {
	const options: RouteOptions = {
		method,
		path: path,
	};

	return function decorator<T extends Class<Controller>>(constructor: T): T | void {
		(constructor as any)[kControllerRoute] = options;
		return constructor;
	};
}

route.get = function (path: string) {
	return route('get', path);
};

route.post = function (path: string) {
	return route('post', path);
};

route.put = function (path: string) {
	return route('put', path);
};

route.patch = function (path: string) {
	return route('patch', path);
};

route.delete = function (path: string) {
	return route('delete', path);
};
