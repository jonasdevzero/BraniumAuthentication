import * as middlewares from '@presentation/middlewares';
// import useCases from './use-cases';
// import repositories from './repositories';
import * as authentication from '@infra/authentication';
import * as cache from '@infra/cache';

// follow a specific order
const injectables = {
	...cache,
	...authentication,
	// ...repositories,
};

export type Middlewares = keyof typeof middlewares;
export type Injectable = keyof typeof injectables;
export type UseCase = keyof {};

export default { ...injectables, ...middlewares };
