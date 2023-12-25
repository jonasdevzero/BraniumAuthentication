export interface MailAddress {
	name?: string;
	email: string;
}

export interface MailMessage {
	to: MailAddress;
	subject: string;
	body: string;
}

export interface MailProvider {
	send(message: MailMessage, meta?: Record<string, unknown>): Promise<void>;
}
