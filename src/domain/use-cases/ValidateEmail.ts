import { ValidateEmailDTO } from '@domain/dtos';
import { LoadedUser } from '@domain/models';

export interface ValidateEmail {
	validate(data: ValidateEmailDTO): Promise<LoadedUser>;
}
