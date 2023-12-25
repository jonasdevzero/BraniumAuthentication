import { RegisterUserDTO } from '@domain/dtos';

export interface RegisterUser {
	register(data: RegisterUserDTO): Promise<void>;
}
