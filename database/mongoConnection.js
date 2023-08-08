const { config } = require('dotenv');
const mongoose = require('mongoose');

config();

const dbName = process.env.MONGO_DB_NAME;
const port = process.env.MONGO_PORT || 27017;

const mongoURL = `mongodb://localhost:${port}/${dbName}`;

const connect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('DB connected successfully');
    } catch (err) {
        console.error(err);
    }
};
const disconnect = () => mongoose.disconnect(err => {
    if (err) {
        console.error('<LOG>: Error at closing mongo connection: ', err);
        return false;
    }
    console.log('<LOG>: Connection closed successfully.');
    return true;
});

module.exports = { connect, disconnect };