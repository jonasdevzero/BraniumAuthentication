import { HashComparer } from '@data/protocols';
import bcrypt from 'bcryptjs';

export class HashComparerBcryptAdapter implements HashComparer {
	async compare(value: string, hashedValue: string): Promise<boolean> {
		return await bcrypt.compare(value, hashedValue);
	}
}
