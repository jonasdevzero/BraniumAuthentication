import { LoginUserDTO } from '@domain/dtos';
import { Authentication } from '@domain/models';

export interface LoginUser {
	login(data: LoginUserDTO): Promise<Authentication>;
}
