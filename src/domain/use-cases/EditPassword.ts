import { EditPasswordDTO } from '@domain/dtos';

export interface EditPassword {
	edit(data: EditPasswordDTO): Promise<void>;
}
