import { ValidateEmailDTO } from '@domain/dtos';

export interface ValidateEmail {
	validate(data: ValidateEmailDTO): Promise<void>;
}
