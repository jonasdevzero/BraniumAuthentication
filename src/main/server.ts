import 'dotenv/config';
import './config/valid';
import '@container/register';
import { ENV } from './config/env';
import fs from 'node:fs';
import https from 'node:https';
import { router } from './routes';
import { connectDatabase } from '@infra/db/mongodb/connection';

const options: https.ServerOptions = {
	requestCert: ENV.NODE_ENV === 'production',
	rejectUnauthorized: ENV.NODE_ENV === 'production',
	key: fs.readFileSync(ENV.PRIVATE_KEY),
	cert: fs.readFileSync(ENV.CERTIFICATE),
	ca: fs.readFileSync(ENV.CA),
};

const server = https.createServer(options, router.lookup.bind(router));
connectDatabase();

server.listen(ENV.PORT, () => {
	console.log('[Authentication] server is running on port ' + ENV.PORT);
});
