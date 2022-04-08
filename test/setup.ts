import http from 'http';
import express from 'express';
import api from '@asmodee/werewolf-server';

async function globalSetup(): Promise<void> {
	const app = express();
	app.use(express.static('dist'));
	app.use('/api', api);

	const server = http.createServer(app);
	server.listen(9526);
}

export default globalSetup;
