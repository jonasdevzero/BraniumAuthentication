import { ENV } from '@main/config/env';
import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectDatabase() {
	client = await new MongoClient(ENV.DATABASE_URL).connect();
	console.log('database connected');

	await Promise.all([
		getCollection('user').createIndex({ id: 1 }, { unique: true }),
		getCollection('user').createIndex({ username: 1 }, { unique: true }),
	]);
}

export function getDatabase() {
	return client.db('authentication');
}

export function getCollection(name: string) {
	return getDatabase().collection(name);
}
