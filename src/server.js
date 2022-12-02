import express from 'express';
import { mapOrder } from '~/utilities/sorts.js';
import { connectDB } from '~/config/mongodb.js';
import { env } from '~/config/environment.js';
import { BoardModel } from './models/board.model';
import { apiV1 } from '~/routes/index.js';

connectDB()
    .then(() => { console.log('connect successfully to database server') })
    .then(() => boostServer())
    .catch((e) => {
        console.log(e);
        process.exit(true);
    })

const boostServer = () => {
    const app = express();
    app.use(express.json());
    app.use('/v1', apiV1);
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello, I'm running at ${env.APP_HOST}:${env.APP_PORT}`);
    })
}