import express from 'express';
import { mapOrder } from '~/utilities/sorts.js';
import { connectDB } from '~/config/mongodb.js';
import { env } from '~/config/environment.js';
const app = express();
connectDB().catch(console.log)
app.get('/', (req, res) => {
    res.end('<h1>Hello world 100000!</h1>');
})

app.listen(env.PORT, env.HOST, () => {
    console.log(`Hello, I'm running at ${env.HOST}:${env.PORT}`);
})
