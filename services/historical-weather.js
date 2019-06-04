const debug = require('debug')('mdbw19-compass-for-developers:historical-weather');
const dbName = 'mdbw19';
const collName = 'weather_data';
const viewNYCMonthlyAvgName = 'nyc_monthly_averages';

module.exports = {
    get: (mongoDbClient) => {
        const db = mongoDbClient.db(dbName);
        const collection = db.collection(collName);
        return collection.find({}).limit(10).toArray();
    },
    getMonthlyAveragesWithAggregation: (mongoDbClient) => {
        const db = mongoDbClient.db(dbName);
        const collection = db.collection(collName);
        const aggregation = require('../queries/agg-monthly-weather')() || [];
        if(aggregation.length === 0) {
            return Promise.resolve([]);
        }
        return collection
            .aggregate(aggregation, {
                maxTimeMS: 5000,
                allowDiskUse: true
            })
            .toArray();
    },
    getMonthlyAveragesWithQuery: (mongoDbClient) => {
        const db = mongoDbClient.db(dbName);
        const collection = db.collection(viewNYCMonthlyAvgName);
        const query = require('../queries/query-monthly-averages')() || {};
        if(Object.keys(query).length === 0) {
            return Promise.resolve([]);
        }
        return collection
            .find(query, {
                maxTimeMS: 1000
            })
            .toArray();
    },
    getAverage: (mongoDbClient, hour, day, month) => {
        const db = mongoDbClient.db(dbName);
        const collection = db.collection(collName);
        const aggregation = require('../queries/agg-weather-for-hour-day-month')(hour, day, month) || [];
        if(aggregation.length === 0) {
            return Promise.resolve([]);
        }
        return collection
            .aggregate(aggregation, {
                maxTimeMS: 5000,
                allowDiskUse: true
            })
            .toArray();
    }
};