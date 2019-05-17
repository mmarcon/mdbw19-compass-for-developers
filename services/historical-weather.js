const debug = require('debug')('mdbw19-compass-for-developers:historical-weather');
const dbName = 'mdbw19';
const collName = 'nyc_weather_data';

module.exports = {
    get: (mongoDbClient) => {
        try {
            const db = mongoDbClient.db(dbName);
            const collection = db.collection(collName);
            return collection.find({}).limit(10).toArray();
        } catch (err) {
            debug(err);
        }
    },
    getMonthlyAverages: (mongoDbClient) => {
        try {
            const db = mongoDbClient.db(dbName);
            const collection = db.collection(collName);
            return collection
                .aggregate(require('../queries/agg-monthly-weather'), {maxTimeMS: 5000, allowDiskUse: true})
                .toArray();
        } catch (err) {
            debug(err);
        }
    }
}