const MongoClient = require('mongodb');
const { connectionString, dbName } = require('../../config');

const state = {
    db: {},
};

const getConnectionFromState = async () => {
    if (state.db[dbName]) {
        // We have a connection in state
        // console.log("DB: Giving connection info from state for db: ", process.env.DB_NAME);
        return state.db[dbName];
    } else {
        // We do not have connection in state
        // console.log("DB: Creating a new connection", process.env.MONGODB_URI);
        const client = await MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        state.db[dbName] = client.db(dbName);
        return state.db[dbName];
    }
};

module.exports = { getConnectionFromState, MongoClient };