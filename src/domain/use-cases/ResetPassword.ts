import { ResetPasswordDTO } from '@domain/dtos';

export interface ResetPassword {
	reset(data: ResetPasswordDTO): Promise<void>;
}
