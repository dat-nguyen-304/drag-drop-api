import { MongoClient } from "mongodb";
import { env } from '~/config/environment.js'
const uri = env.MONGODB_URI;

export const connectDB = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    try {
        await client.connect();
        await listDatabases(client);
        console.log('connect mongo successfully')
    } finally {
        await client.close();
    }
}

const listDatabases = async (client) => {
    const databaseList = await client.db().admin().listDatabases();
    console.log(databaseList);
    console.log('Your database: ');
    databaseList.databases.forEach(db => console.log(` - ${db.name}`))
}