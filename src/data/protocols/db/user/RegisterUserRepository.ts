import { RegisterUserDTO } from '@domain/dtos';
import { User } from '@domain/models';

export interface RegisterUserRepository {
	create(data: RegisterUserDTO): Promise<User>;
}
