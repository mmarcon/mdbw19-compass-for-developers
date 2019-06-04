module.exports = {
    darksky_api_key: 'xxx123yyy456zzz',
    mongo: {
        localhost: 'mongodb://localhost:27017',
        docker: `${process.env.MONGO_HOST}:27017`,
        atlas: `<atlas connection string>`
    }
};