import * as middlewares from '@presentation/middlewares';
import useCases from './use-cases';
import repositories from './repositories';
import * as authentication from '@infra/authentication';
import * as cache from '@infra/cache';
import * as mail from '@infra/mail';

// follow a specific order
const injectables = {
	...cache,
	...authentication,
	...mail,
	...repositories,
};

export type Middlewares = keyof typeof middlewares;
export type Injectable = keyof typeof injectables;
export type UseCase = keyof typeof useCases;

export default { ...injectables, ...middlewares, ...useCases };
