import { RecoverPasswordDTO } from '@domain/dtos';

export interface RecoverPassword {
	recover(data: RecoverPasswordDTO): Promise<void>;
}
