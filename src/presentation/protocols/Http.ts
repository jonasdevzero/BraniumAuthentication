import { UserRole } from '@domain/models';
import { IncomingHttpHeaders } from 'http';

export interface HttpRequest {
	body?: any;
	query: Record<string, any>;
	params: Record<string, string>;
	headers: IncomingHttpHeaders;
	user: {
		id: string;
		role?: UserRole;
	};
}

export interface HttpResponse {
	body?: any;
	statusCode: number;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
