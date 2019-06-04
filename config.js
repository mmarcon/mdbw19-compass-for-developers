module.exports = {
    darksky_api_key: '6843de0f634692c2dc1081a5c35f80c6',
    mongo: {
        localhost: 'mongodb://localhost:27017',
        docker: `${process.env.MONGO_HOST}:27017`,
        atlas: `mongodb+srv://weather:0omOQvCAoNZISkLp@marcon-me-test-toyed.mongodb.net/test?retryWrites=true&w=majority`
    }
};