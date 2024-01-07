import { Authentication } from '@domain/models';

export interface RefreshUser {
	refresh(token: string): Promise<Authentication>;
}
