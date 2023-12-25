import { EditUserDTO } from '@domain/dtos';

export interface EditUserRepository {
	edit(data: EditUserDTO): Promise<void>;
}
