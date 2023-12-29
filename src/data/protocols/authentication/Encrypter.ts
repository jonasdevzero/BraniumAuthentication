export interface EncrypterOptions {
	payload?: Record<string, unknown>;
	expiresIn?: string;
}

export interface Encrypter {
	encrypt(subject?: string, options?: EncrypterOptions): string;
}
