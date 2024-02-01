import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from "mongoose";
import router from './router';
import config from "config";

const port = config.get<number>('port');
const dbUri = config.get<string>('dbUri');

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
})

mongoose.Promise = Promise;
mongoose.connect(dbUri);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());