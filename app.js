const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const v1Routes = require('./routes/v1/task.routes');
const mongoConnection = require('./database/mongoConnection');

// ENV VARIABLES
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/v1', v1Routes);

const closeConnectionsGracefully = () => {
    const isMongoConnectionClosed = mongoConnection.disconnect();
    process.exit(isMongoConnectionClosed ? 0 : 1);
}

if (process.platform === 'win32') {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', () => process.emit('SIGINT'));
}

process.on('SIGINT', () => {
    closeConnectionsGracefully();
});

process.on('SIGTERM', () => {
    closeConnectionsGracefully();
});

app.listen(PORT, async (err) => {
    if (err) throw err;

    try {
        console.log(`Tasks API Running at: ${PORT}`);
        await mongoConnection.connect();
    } catch (err) {
        console.error(err);
    }
});